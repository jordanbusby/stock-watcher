# Stock Watcher Project by Jordan Busby

## Notes
- It doesn't appear to be working in Node 17+, using Node 16.13.1. This can probably be fixed by  `export NODE_OPTIONS=--openssl-legacy-provider` in terminal before launch; but I haven't yet tested.

## Updates

### Added error handling
- If fetch() rejects, it provides the user with an information message instead of sending error to console.
- If symbol is not found or is invalid, user is provided with appropriate message.
- On page load, two stocks were automatically fetched. If for whatever reason they don't load, the page won't add 'blank' stock cards.

### Stock Meter
- Added stock meter to left side of card.
- StockQuoteView method calculates percentage of price in high/low range and updates arrow position accordingly.