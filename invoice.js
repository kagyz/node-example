import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/invoice', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    invoice_number: 'INV-001',
    issue_date: '2026-03-15',
    due_date: '2026-04-15',
    currency: 'USD',
    from: {
      name: 'Acme Corp',
      email: 'billing@acme.com',
      address: '123 Main St\nNew York, NY 10001'
    },
    to: {
      name: 'Client Inc.',
      email: 'accounts@client.com'
    },
    items: [
      { description: 'Web Development', quantity: 40, unit_price: 150 },
      { description: 'Design Review', quantity: 5, unit_price: 200 }
    ],
    tax: { rate: 8.25 },
    notes: 'Payment due within 30 days.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('invoice.pdf', Buffer.from(buffer));
console.log('Invoice saved to invoice.pdf');
