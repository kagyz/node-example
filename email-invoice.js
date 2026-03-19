import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/invoice', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    invoice_number: 'INV-EMAIL-001',
    issue_date: '2026-03-19',
    due_date: '2026-04-19',
    currency: 'USD',
    from: {
      name: 'Acme Corp',
      email: 'billing@acme.com',
      address: '123 Main St\nNew York, NY 10001'
    },
    to: {
      name: 'Client Inc.',
      email: 'client@example.com'
    },
    items: [
      { description: 'Web Development', quantity: 10, unit_price: 150 },
      { description: 'Design Review', quantity: 5, unit_price: 200 }
    ],
    tax: { rate: 8.25 },
    deliver_to: {
      email: 'client@example.com',
      subject: 'Invoice INV-EMAIL-001 from Acme Corp',
      message: 'Hi,\n\nPlease find your invoice attached.\n\nThank you,\nAcme Corp'
    }
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

// PDF is still returned even when email is sent
const delivered = response.headers.get('X-Kagyz-Delivered-To');
const buffer = await response.arrayBuffer();
fs.writeFileSync('email-invoice.pdf', Buffer.from(buffer));
console.log('Invoice saved to email-invoice.pdf');
if (delivered) {
  console.log(`Invoice also emailed to: ${delivered}`);
}
