# Stock Watcher Project by Jordan Busby

## Notes
It doesn't appear to be working in Node 17+, most likely because of the openSSL changes. 

## Updates

### Added error handling
- If fetch() rejects, it provides the user with an information message instead of sending error to console.
- If symbol is not found or is invalid, user is provided with appropriate message.
- On page load, two stocks were automatically fetched. If for whatever reason they don't load, the page won't add 'blank' stock cards.