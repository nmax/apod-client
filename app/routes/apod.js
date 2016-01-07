import Ember from 'ember';

export default Ember.Route.extend({
  model ({ apod_id }) {
    return this.store.find('apod', apod_id);
  }
});
