import fs from 'fs';
import 'dotenv/config';

const response = await fetch('https://api.kagyz.com/v1/timesheet', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    timesheet_number: 'TS-001',
    date: '2026-03-17',
    due_date: '2026-04-17',
    currency: 'USD',
    period: 'March 1–15, 2026',
    hourly_rate: 150,
    from: { name: 'Jane Smith', email: 'jane@freelancer.com' },
    to: { name: 'TechCorp Inc.', email: 'accounts@techcorp.com' },
    entries: [
      { date: '2026-03-01', description: 'Frontend development', hours: 8 },
      { date: '2026-03-02', description: 'API integration', hours: 6.5 },
      { date: '2026-03-03', description: 'Code review', hours: 4 }
    ],
    notes: 'Payment due within 30 days.'
  })
});

if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const buffer = await response.arrayBuffer();
fs.writeFileSync('timesheet.pdf', Buffer.from(buffer));
console.log('Timesheet saved to timesheet.pdf');
