import { Router } from 'express';
import paypal from '@paypal/checkout-server-sdk';
import { getPayPalClient, formatAmount } from '../lib/paypal.js';
import { Order } from '../models/Order.js';
import { sendOrderConfirmationEmail } from '../lib/email.js';

export const ordersRouter = Router();

ordersRouter.post('/create', async (req, res) => {
  try {
    const { items, subtotal, tax, shipping, total, currency = 'USD', customer } = req.body;

    if (!items || !Array.isArray(items) || !customer?.email || !customer?.name) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    // 1️⃣ Create MongoDB order
    const order = await Order.create({
      items,
      subtotal,
      tax,
      shipping,
      total,
      currency,
      customer,
      status: 'created',
    });

    // 2️⃣ Build PayPal order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: formatAmount(total),
            breakdown: {
  item_total: { currency_code: currency, value: formatAmount(subtotal) },
  shipping: { currency_code: currency, value: formatAmount(shipping || 0) },
  tax_total: { currency_code: currency, value: formatAmount(tax || 0) },
  discount: { currency_code: currency, value: "0.00" },
  handling: { currency_code: currency, value: "0.00" },
  insurance: { currency_code: currency, value: "0.00" },
  shipping_discount: { currency_code: currency, value: "0.00" },
}
,
          },
        },
      ],
      application_context: {
        brand_name: 'VintageVault',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    });

    // 3️⃣ Execute PayPal order
    let createResponse;
    try {
      createResponse = await getPayPalClient().execute(request);
    } catch (paypalErr: any) {
      console.error('PayPal error details:', paypalErr);
      return res.status(500).json({ error: 'Failed to create PayPal order', details: paypalErr.message });
    }

    const paypalOrderId = createResponse.result.id as string;
    order.paypalOrderId = paypalOrderId;
    await order.save();

    // 4️⃣ Find approve URL
    const approveUrl = createResponse.result.links.find((link: any) => link.rel === 'approve')?.href;

    // 5️⃣ Respond with order info
    res.json({
      id: order._id,
      paypalOrderId,
      approveUrl,
    });

  } catch (err: any) {
    console.error('Server error in /create:', err);
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// Cash on Delivery flow: create order and send confirmation email without PayPal
ordersRouter.post('/cod', async (req, res) => {
  try {
    const { items, subtotal, tax, shipping, total, currency = 'USD', customer } = req.body;
    if (!items || !Array.isArray(items) || !customer?.email || !customer?.name) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    const order = await Order.create({
      items,
      subtotal,
      tax,
      shipping,
      total,
      currency,
      customer,
      status: 'created',
    });

    try {
      const baseParams = {
        customer_name: order.customer.name,
        customer_email: order.customer.email,
        order_id: order.id,
        total: order.total,
        currency: order.currency,
        items: order.items.map((i) => `${i.name} x ${i.quantity} = ${i.price * i.quantity}`).join(', '),
        payment_method: 'Cash on Delivery',
      } as const;

      // Send to customer
      await sendOrderConfirmationEmail({ ...baseParams, to_email: order.customer.email });

      // Send to admin/inbox
      await sendOrderConfirmationEmail(baseParams as any);
    } catch (emailErr) {
      // Log email error but do not fail the order
      console.error('Email sending failed (COD)', emailErr);
    }

    res.json({ success: true, orderId: order.id });
  } catch (err: any) {
    console.error('Server error in /cod:', err);
    res.status(500).json({ error: 'Failed to place COD order', details: err.message });
  }
});
ordersRouter.post('/capture', async (req, res) => {
  try {
    const { orderId, paypalOrderId } = req.body;
    if (!orderId || !paypalOrderId) {
      return res.status(400).json({ error: 'orderId and paypalOrderId are required' });
    }

    const order = await Order.findById(orderId);
    if (!order || order.paypalOrderId !== paypalOrderId) {
      return res.status(404).json({ error: 'Order not found' });
    }

   const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
request.requestBody({} as any); // bypass type check
const capture = await getPayPalClient().execute(request);


    if ((capture.result.status as string) === 'COMPLETED') {
      order.status = 'paid';
      await order.save();

      // Optional: send confirmation email here if you use EmailJS
      // await sendOrderConfirmationEmail({ ... });

      return res.json({ success: true, orderId: order._id });
    }

    order.status = 'failed';
    await order.save();
    res.status(400).json({ error: 'Payment not completed' });

  } catch (err: any) {
    console.error('Server error in /capture:', err);
    res.status(500).json({ error: 'Failed to capture PayPal order', details: err.message });
  }
});

