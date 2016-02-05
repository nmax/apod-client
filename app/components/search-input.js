import Ember from 'ember';

const {debounce} = Ember.run;

export default Ember.Component.extend({

  debounceRate: 250,

  minQueryLength: 3,

  currentValue: '',

  actions: {
    search (query) {
      let normalizedQuery = query && query.trim();
      if (normalizedQuery && normalizedQuery.length >= this.get('minQueryLength')) {
        debounce(this, '_search', normalizedQuery, this.get('debounceRate'));
      }
    },

    reset () {
      this.getAttr('on-reset')();
    }
  },

  _search (query) {
    this.getAttr('on-search')(query);
  }

});
