import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    searchTerm: 'q'
  },

  searchTerm: '',

  actions: {
    updateSearch (newSearchTerm) {
      if (newSearchTerm !== this.get('searchTerm')) {
        this.set('searchTerm', newSearchTerm);
      }
    },

    resetSearch () {
      this.set('model', []);
      this.set('searchTerm', '');
    }
  }
});
