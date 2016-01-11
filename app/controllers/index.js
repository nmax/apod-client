import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['offset', 'limit'],

  offset: 0,
  limit: 10,

  sortedByDate: computed('model.[]', function () {
    let model = this.get('model');
    return model.sortBy('date:desc');
  })
});
