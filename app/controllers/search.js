import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    searchTerm: 'q'
  },

  searchTerm: null,

  actions: {
    updateSearch (newSearchTerm) {
      if (newSearchTerm !== this.get('searchTerm')) {
        this.set('searchTerm', newSearchTerm);
      }
    },

    resetSearch () {
      this.set('model', null);
      this.set('searchTerm', null);
    }
  }
});
