import MainView from './Main/MainView';
import Marionette from 'backbone.marionette';
import './style.scss';
import {getGlobalQuoteBySymbol} from "./StockQuote/StockQuoteService";
import {createFromGlobalQuote, StockQuoteCollection} from "./StockQuote/StockQuoteModel";
import {StockQuoteCollectionView} from "./StockQuote/StockQuoteCollectionView";
import getFakeData from './FakeData'

document.addEventListener('DOMContentLoaded', () => {
  
  // SETUP
  const StockWatcherApp = new Marionette.Application();
  StockWatcherApp.start();
  
  const mainView = new MainView()
  mainView.render();
  
  const stockQuoteCollection = new StockQuoteCollection()
  
  const globalQuotes = Promise.all(
    ['IBM', 'AAPL']
    .map(getGlobalQuoteBySymbol)
    )
    .then(globalQuotes => {
      stockQuoteCollection.add(
        globalQuotes.filter(quote =>
          Boolean(Object.keys(quote).length) &&
          !Object.prototype.hasOwnProperty.call(quote, 'Note')
          )
          .map(createFromGlobalQuote))
      });
      
  new StockQuoteCollectionView({el: '#stock-quotes', collection: stockQuoteCollection}).render();
      
  const addNewQuoteToCollection = (globalQuote, symbol) => {
    // if api is maxed out, it will respond with { Note }, check for that here
    if (Object.prototype.hasOwnProperty.call(globalQuote, 'Note')) {
      setError()
      return
    }

    // if symbol isn't found / is invalid
    if (Object.keys(globalQuote).length === 0) {
      setError(symbol)
      return
    }

    // add the stock
    stockQuoteCollection.add(createFromGlobalQuote(globalQuote));
  }

  const setError = (symbol) => {
    const errorMessage = symbol
      ? `Symbol ${symbol} was not found or is invalid. Please check spelling.`
      : `Please try again in one or two minutes.`

    const inputErrorLabel = document.querySelector('.stock-error-text')
    const input = document.querySelector('#stock-search-input')

    inputErrorLabel.innerHTML = errorMessage
    input.classList.add('is-invalid')
  }

  mainView.on("stockSearch", async function(e) {
      const searchSymbol = e.symbol;

      getGlobalQuoteBySymbol(e.symbol)
        .then(data => addNewQuoteToCollection(data, searchSymbol))

      // fake data
      // try {
      //   const data = await getFakeData(e.symbol)
      //   addNewQuoteToCollection(data)
      // } catch (e) {
      //   console.log('catch block', e)
      // }
  })
})