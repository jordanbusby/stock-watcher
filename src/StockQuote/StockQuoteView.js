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
    getArrowSvg(value) {
      const num = Number(value).toFixed(2)
      
      return num >= 0
      ? arrowUp
      : arrowDown
    },
    
    // get a class-name for the stock quote card for red or green coloring
    // this is used in the stock quote card template
    getValueClassName(value) {
    const num = Number(value).toFixed(2)

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

      // get percentage of a range
      let pct = Math.floor((numPrice - numLow) * 100 / (numHigh - numLow))

      // set the limit on the arrow between 12 - 88 so it doesnt go past the meter line
      pct = pct > 88 ? 88 : pct < 12 ? 12 : pct

      // return a % string for css variable
      return `${pct}%`
    }
})