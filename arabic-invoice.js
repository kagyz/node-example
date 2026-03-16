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
    currency: 'SAR',
    direction: 'rtl',
    from: {
      name: 'شركة أكمي للتقنية',
      email: 'billing@acme-tech.sa',
      address: 'شارع الملك فهد\nالرياض 12345'
    },
    to: {
      name: 'شركة التقدم للحلول',
      email: 'accounts@taqadum.sa'
    },
    items: [
      { description: 'تصميم وتطوير الموقع الإلكتروني', quantity: 1, unit_price: 15000 },
      { description: 'صيانة شهرية ودعم فني', quantity: 6, unit_price: 2000 }
    ],
    tax: { rate: 15 },
    notes: 'يرجى السداد خلال 30 يوماً من تاريخ الفاتورة.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('arabic-invoice.pdf', Buffer.from(buffer));
console.log('Arabic invoice saved to arabic-invoice.pdf');
