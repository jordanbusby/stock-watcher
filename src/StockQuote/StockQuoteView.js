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

    getStockMeterArrowPosition() {
      return 1
    }
})