# Backend (server)

## Prerequisites
- Node.js 18+
- MongoDB Atlas connection string
- PayPal REST credentials (Client ID/Secret)
- EmailJS account with a transactional template

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
```bash
cd server
npm install
```
3. Run in dev (ESM-ready):
```bash
npm run dev
```
4. Build + start for production:
```bash
npm run start:prod
```

## Environment variables
- `PORT`: API port, default 5000
- `CLIENT_ORIGIN`: Frontend origin for CORS (e.g. http://localhost:5173)
- `MONGODB_URI`: MongoDB Atlas URI
- `PAYPAL_ENV`: `sandbox` or `live`
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_TO_EMAIL`

## API
- `POST /api/orders/create`
  - body: `{ items, subtotal, tax, shipping, total, currency, customer: { name, email, address? } }`
  - returns: `{ id, paypalOrderId }`
- `POST /api/orders/capture`
  - body: `{ orderId, paypalOrderId }`
  - returns: `{ success: true, orderId }` when payment is completed

On successful capture, a confirmation email is sent via EmailJS.

## Sample requests
Create order:
```bash
curl -X POST "http://localhost:5000/api/orders/create" \
  -H "Content-Type: application/json" \
  -d '{
    "items":[{"productId":"1","name":"Vintage Chair","price":120,"quantity":1}],
    "subtotal":120,
    "tax":0,
    "shipping":0,
    "total":120,
    "currency":"USD",
    "customer":{"name":"John Doe","email":"john@example.com"}
  }'
```
Capture order:
```bash
curl -X POST "http://localhost:5000/api/orders/capture" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"<dbId>","paypalOrderId":"<paypalId>"}'
```

## Postman collection
Import `server/postman_collection.json` into Postman for ready-made requests.
