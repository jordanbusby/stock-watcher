# Stock Watcher Project by Jordan Busby

## Notes
- It doesn't appear to be working in Node 17+, using Node 16.13.1. This can probably be fixed by  `export NODE_OPTIONS=--openssl-legacy-provider` in terminal before launch; but I haven't yet tested.

## Updates

### Added error handling
- If fetch() rejects, it provides the user with an information message instead of sending error to console.
- If symbol is not found or is invalid, fetch returns 200 still, so this is detected and user is provided with appropriate message.
- On page load, two stocks were automatically fetched. If for whatever reason they don't load, the page won't add 'blank' stock cards.

### Stock Meter
- Added stock meter to left side of card.
- StockQuoteView method calculates percentage of price in high/low range and updates arrow position accordingly.

### Fake Data
- Added a fake data function, if needed while making many changes so you don't timeout the API. It has a limited set of symbols to choose from.

### CSS
- Added a lot of media queries for the stock quote card.
- Added an animation on new stock cards to bring attention that a card has been added.

## Todo
- Clean up/consolidate CSS media queries. 
- Some of the error handling is fragmented between files/locations. This could be cleaned up.
- Import a symbol -> name map to display the appropriate company name instead of the symbol at the top. (Like the designs do)
- If invalid symbol is added, could display a list of similar symbols so user could easily click the wanted one. i.e., 'MST' not found, did you mean 'MSFT'?


## Questions for designers
- I was wondering if adding some more animation/mouseover effects might be good or distracting.
- 