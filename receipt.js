import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/receipt', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    receipt_number: 'REC-001',
    date: '2026-03-15',
    currency: 'USD',
    payment_method: 'Credit Card',
    transaction_id: 'txn_1234567890',
    from: { name: 'Acme Corp' },
    to: { name: 'John Doe', email: 'john@example.com' },
    items: [
      { description: 'Pro Plan — Monthly', quantity: 1, unit_price: 49 }
    ]
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('receipt.pdf', Buffer.from(buffer));
console.log('Receipt saved to receipt.pdf');
