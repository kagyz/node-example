# Kagyz Node.js Examples

Generate professional PDF documents from JSON using the [Kagyz API](https://kagyz.com). Each script demonstrates a different document type.

## Quick Start

```bash
git clone https://github.com/kagyz/node-example.git
cd node-example
npm install
cp .env.example .env
```

Add your API key to `.env`:

```
KAGYZ_API_KEY=your_api_key_here
```

Get your API key at [kagyz.com](https://kagyz.com).

## Examples

| Script | Command | Description |
|--------|---------|-------------|
| `invoice.js` | `npm run invoice` | Standard invoice with tax |
| `receipt.js` | `npm run receipt` | Payment receipt with transaction ID |
| `quote.js` | `npm run quote` | Quote / estimate with expiry date |
| `credit-note.js` | `npm run credit-note` | Credit note referencing an invoice |
| `packing-slip.js` | `npm run packing-slip` | Packing slip with SKUs and weights |
| `arabic-invoice.js` | `npm run arabic` | RTL Arabic invoice (SAR currency) |

## How It Works

Each script sends a JSON payload to the Kagyz API and saves the returned PDF:

```javascript
const response = await fetch('https://api.kagyz.com/v1/invoice', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.KAGYZ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    invoice_number: 'INV-001',
    currency: 'USD',
    // ... your data
  })
});

fs.writeFileSync('invoice.pdf', Buffer.from(await response.arrayBuffer()));
```

## Requirements

- Node.js 18+
- A Kagyz API key

## Links

- [Kagyz Documentation](https://kagyz.com/docs)
- [API Reference](https://kagyz.com/docs/api)
- [Python Examples](https://github.com/kagyz/python-example)

## License

MIT
