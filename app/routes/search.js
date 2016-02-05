import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    searchTerm: {
      refreshModel: true
    }
  },

  model ({ searchTerm }) {
    if (searchTerm) {
      return this.store.query('apod', {
        q: searchTerm
      });
    }
  }

});
