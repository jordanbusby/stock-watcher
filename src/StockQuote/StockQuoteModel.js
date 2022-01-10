import Backbone from 'backbone';

export const StockQuoteModel = Backbone.Model.extend({
    idAttribute: 'symbol',
    defaults: {
        name: '',
        open: 0,
        high: 0,
        low: 0,
        price: 0,
        change: 0,
        percentChange: ''
    }
})

export const StockQuoteCollection = Backbone.Collection.extend({
    model: StockQuoteModel
})

export const createFromGlobalQuote = (globalQuote, name) => {
  let changePercent = globalQuote["10. change percent"] || ""

  // remove the percentage sign and cast to number
  changePercent = +(changePercent.slice(0, -1))

  // trim to two decimal places
  changePercent = changePercent.toFixed(2)

    return new StockQuoteModel({
        name: name || globalQuote["01. symbol"],
        symbol: globalQuote["01. symbol"],
        open: globalQuote["02. open"],
        high: globalQuote["03. high"],
        low: globalQuote["04. low"],
        price: globalQuote["05. price"],
        change: globalQuote["09. change"],
        changePercent: `${changePercent}%`
    })
}