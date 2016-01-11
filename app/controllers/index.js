import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['offset', 'limit'],

  offset: 0,
  limit: 10,

  apodsSortingDesc: ['date:desc'],
  sortedByDate: computed.sort('model.[]', 'apodsSortingDesc')

});
