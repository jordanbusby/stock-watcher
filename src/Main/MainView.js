import Marionette from 'backbone.marionette';
import template from './MainTemplate.html';
import _ from 'underscore';
import './main.scss';

const MainView = Marionette.View.extend({
    template: _.template(template),
    el: '#app',

    ui: {
        stockSearchInput: '#stock-search-input',
        stockSearchButton: '#stock-search-button',
        stockSearchInputError: '.stock-error-text',
        stockSearchForm: '#stock-search-form'
    },

    events: {
        'click @ui.stockSearchButton': 'searchStock',
        'input @ui.stockSearchInput': 'removeInputInvalidClass',
        'submit @ui.stockSearchForm': 'searchStock'
    },

    // on 'add stock' click
    searchStock: function(evt) {
      evt.preventDefault()

      const symbol = this.ui.stockSearchInput.val();

      if (symbol.length < 1) {
          // TODO: show the user a warning here

          // set error text
          this.ui.stockSearchInputError.html("Please enter a stock symbol.")
          // add bootstrap class
          this.ui.stockSearchInput.addClass('is-invalid')

          return;
      }


      this.ui.stockSearchInput.val('');
      this.trigger('stockSearch', {symbol: symbol.toUpperCase()});
    },

    removeInputInvalidClass() {
      // get reference to input
      const input = this.ui.stockSearchInput

      // if input was invalidated, remove that class on typing
      if (input.hasClass('is-invalid')) {
        input.removeClass('is-invalid')
      }
    }
})

export default MainView;