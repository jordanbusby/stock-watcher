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
        // i added a filter if API doesn't respond on load for these two quotes
        globalQuotes.filter(quote => Boolean(Object.keys(quote).length))
        .map(createFromGlobalQuote))
      });
      
      new StockQuoteCollectionView({el: '#stock-quotes', collection: stockQuoteCollection}).render();
      
      // UPDATE
      // add symbol parameter for error handling
      const addNewQuoteToCollection = (globalQuote, symbol) => {
        // check to see globalQuote isnt empty
        if (Object.keys(globalQuote).length !== 0) {
          stockQuoteCollection.add(createFromGlobalQuote(globalQuote));
          return
        }
        
        // if it is empty (no API response / symbol not found)
        setInvalidSymbolClass(symbol)
      }
      
      const setInvalidSymbolClass = (symbol) => {
        const inputErrorText = document.querySelector('.stock-error-text')
        const stockSearchInput = document.querySelector('#stock-search-input')
        inputErrorText.innerHTML = `Symbol <span class="error-text-symbol">${symbol}</span> was not found or is invalid. Please check spelling.`
        stockSearchInput.classList.add('is-invalid')
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