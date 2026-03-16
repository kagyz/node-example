import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/packing-slip', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    packing_slip_number: 'PS-001',
    date: '2026-03-15',
    order_number: 'ORD-4521',
    shipping_method: 'FedEx Ground',
    tracking_number: '794644790132',
    from: { name: 'Warehouse', address: '500 Fulfillment Way\nPhoenix, AZ 85001' },
    to: { name: 'Sarah Johnson', address: '742 Evergreen Terrace\nSpringfield, IL 62704' },
    items: [
      { description: 'Blue T-Shirt (L)', quantity: 2, sku: 'BLU-TSH-L', weight: '0.3 kg' },
      { description: 'Running Shoes', quantity: 1, sku: 'RUN-SHO-42', weight: '0.8 kg' }
    ],
    notes: 'Handle with care.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('packing-slip.pdf', Buffer.from(buffer));
console.log('Packing slip saved to packing-slip.pdf');
