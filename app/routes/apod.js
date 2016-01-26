import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    navigateToNext () {
      let model = this.modelFor('apod');
      let nextId = model.getNextModelId();
      return this.transitionTo('apod', nextId);
    },

    navigateToPrevious () {
      let model = this.modelFor('apod');
      let prevId = model.getPreviousModelId();
      return this.transitionTo('apod', prevId);
    }
  },

  model ({ apod_id }) {
    return this.store.find('apod', apod_id);
  }
});
