import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/invoice', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    invoice_number: 'INV-BRAND-001',
    issue_date: '2026-03-17',
    due_date: '2026-04-17',
    currency: 'USD',
    branding: {
      accent_color: '#22c55e'
    },
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
      { description: 'Web Development', quantity: 10, unit_price: 150 },
      { description: 'Design Review', quantity: 5, unit_price: 200 }
    ],
    tax: { rate: 8.25 },
    notes: 'Thank you for your business.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('branded-invoice.pdf', Buffer.from(buffer));
console.log('Branded invoice saved to branded-invoice.pdf');
