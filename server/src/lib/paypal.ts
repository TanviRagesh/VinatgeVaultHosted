

import paypal from '@paypal/checkout-server-sdk';

export function getPayPalClient(): paypal.core.PayPalHttpClient {
  const clientId = process.env.PAYPAL_CLIENT_ID as string;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;
  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL credentials are not set');
  }
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase();
  const environment = env === 'live'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(environment);
}

export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

