import Marionette from 'backbone.marionette';
import template from './StockQuoteCard.html';
import arrowDown from '../../assets/arrow-down.svg'
import arrowUp from '../../assets/arrow-up.svg'
import _ from 'underscore';
import './stock-quote-card.scss'

export const StockQuoteView = Marionette.View.extend({
    className: "stock-card",
    template: _.template(template),

    initialize: function() {

        _.bindAll(this, 'template');
    },
    /**
     *
     * @param {String} value
     * @returns {String}
     */
    formatMoney: function(value) {
        // TODO - complete the format money method, don't just return the input.

        const re = /^(-?\d+[.]\d{1,2})\d*$/
        
        const [, match] = re.exec(value) || ['', '0.00']

        return match
    },
    
    /**
     * @param {string} value
     * @returns {string} The imported svg string contained in the assets folder. 
     * 
     * Used to pass the svg inline to the StockQuoteCard.html template
     */
    getArrow(value) {
      const num = Number(Number(value).toFixed(2))
      
      return num >= 0
      ? arrowUp
      : arrowDown
    },
    
    getValueClassName(value) {
    const num = Number(Number(value).toFixed(2))

    return num >= 0
    ? 'value-up'
    : 'value-down'
    },

    /**
     * @param {string} high
     * @param {string} low
     * @param {string} price
     * @returns {string}
     * 
     * 
     * This is to get the css variable '--arrow-position' for
     * the arrow on the stock meter.
     */

    getStockMeterArrowPosition: (high, low, price) => {

      // cast to number
      const numHigh = +high
      const numLow = +low
      const numPrice = +price

      // get percentage of a range, -10 because the stock meter sits in the center
      // of the div and its height is 80% of the container
      const pct = Math.floor(((numPrice - numLow) * 100 / (numHigh - numLow)) - 10)

      // return a % string for css variable
      return `${pct}%`
    }
})