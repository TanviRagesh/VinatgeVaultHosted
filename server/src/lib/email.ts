import * as emailjs from '@emailjs/nodejs';

export async function sendOrderConfirmationEmail(params: Record<string, unknown> & { to_email?: string }): Promise<void> {
  const serviceId = process.env.EMAILJS_SERVICE_ID as string;
  const templateId = process.env.EMAILJS_TEMPLATE_ID as string;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY as string;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY as string;
  const toEmail = process.env.EMAILJS_TO_EMAIL as string;

  if (!serviceId || !templateId || !publicKey || !privateKey || !toEmail) {
    throw new Error('EmailJS env vars are not set');
  }

  const finalTo = params.to_email || toEmail;

  await emailjs.send(
    serviceId,
    templateId,
    { to_email: finalTo, ...params },
    { publicKey, privateKey }
  );
}

