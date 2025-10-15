import mongoose, { Schema, Document } from 'mongoose';

export interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface OrderDocument extends Document {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  customer: {
    name: string;
    email: string;
    address?: string;
  };
  status: 'created' | 'paid' | 'failed' | 'refunded';
  paypalOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<OrderDocument>(
  {
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String },
    },
    status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' },
    paypalOrderId: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

