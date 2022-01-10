const data = [
  {
    '01. symbol': "GOOG",
    '02. open': "2749.9500",
    '03. high': "2793.7200",
    '04. low': "2735.2700",
    '05. price': "2751.0200",
    '06. volume': "1452452",
    '07. latest trading day': "2022-01-06",
    '08. previous close': "2753.0700",
    '09. change': "-2.0500",
    '10. change percent': "-0.0745%",
  },
  {
      "01. symbol": "MSFT",
      "02. open": "313.1500",
      "03. high": "318.7000",
      "04. low": "311.4900",
      "05. price": "313.8800",
      "06. volume": "39646148",
      "07. latest trading day": "2022-01-06",
      "08. previous close": "316.3800",
      "09. change": "-2.5000",
      "10. change percent": "-0.7902%"
  },
  {
    "01. symbol": "AMZN",
    "02. open": "3269.0100",
    "03. high": "3296.0000",
    "04. low": "3238.7442",
    "05. price": "3265.0800",
    "06. volume": "2597889",
    "07. latest trading day": "2022-01-06",
    "08. previous close": "3287.1400",
    "09. change": "-22.0600",
    "10. change percent": "-0.6711%"
  },
  {
    "01. symbol": "BABA",
    "02. open": "124.2600",
    "03. high": "128.3999",
    "04. low": "123.4650",
    "05. price": "126.6300",
    "06. volume": "32045782",
    "07. latest trading day": "2022-01-06",
    "08. previous close": "121.1600",
    "09. change": "5.4700",
    "10. change percent": "4.5147%"
  },
  {
    "01. symbol": "JPM",
    "02. open": "166.9100",
    "03. high": "167.3700",
    "04. low": "163.8700",
    "05. price": "165.5200",
    "06. volume": "13935298",
    "07. latest trading day": "2022-01-06",
    "08. previous close": "163.7800",
    "09. change": "1.7400",
    "10. change percent": "1.0624%"
}
]

/**
 * 
 * @param {String} symbol 
 * @returns {Promise<Record<string, any>>}
 */

const getFakeData = (symbol) => {
  const selectedSymbol = data.find(stock => stock["01. symbol"] === symbol)

  // mimic a fetch and wrap in promise
  return new Promise(resolve => setTimeout(() => resolve(selectedSymbol), 1500))
}

export default getFakeData