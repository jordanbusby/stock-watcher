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
        .then(globalQuotes => stockQuoteCollection.add(globalQuotes.map(createFromGlobalQuote)));

    new StockQuoteCollectionView({el: '#stock-quotes', collection: stockQuoteCollection}).render();

    // UPDATE
    const addNewQuoteToCollection = (globalQuote) => {
        stockQuoteCollection.add(createFromGlobalQuote(globalQuote));
    }



    mainView.on("stockSearch", async function(e) {
        const searchSymbol = e.symbol;

        getGlobalQuoteBySymbol(e.symbol)
          .then(data => {
            console.log(data)
            addNewQuoteToCollection(data)
          })

        // fake data
        // try {
        //   const data = await getFakeData(e.symbol)
        //   addNewQuoteToCollection(data)
        // } catch (e) {
        //   console.log('catch block', e)
        // }
    })
})