import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/quote', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    quote_number: 'QUO-001',
    date: '2026-03-15',
    currency: 'USD',
    title: 'Estimate',
    expiry_date: '2026-04-15',
    from: { name: 'Design Studio' },
    to: { name: 'Startup Inc.' },
    items: [
      { description: 'Logo Design', quantity: 1, unit_price: 2000 },
      { description: 'Brand Guidelines', quantity: 1, unit_price: 3500 }
    ],
    notes: 'Valid for 30 days. 50% deposit required to begin.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('quote.pdf', Buffer.from(buffer));
console.log('Quote saved to quote.pdf');
