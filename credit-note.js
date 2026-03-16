import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/credit-note', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    credit_note_number: 'CN-001',
    date: '2026-03-15',
    currency: 'USD',
    invoice_number: 'INV-001',
    reason: 'Overcharge correction',
    from: { name: 'Acme Corp' },
    to: { name: 'Client Inc.' },
    items: [
      { description: 'Billing adjustment', quantity: 1, unit_price: 500 }
    ]
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('credit-note.pdf', Buffer.from(buffer));
console.log('Credit note saved to credit-note.pdf');
