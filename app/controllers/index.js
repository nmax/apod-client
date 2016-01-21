import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['offset', 'limit', 'scrollTop'],

  offset: 0,
  limit: 15,

  scrollTop: 0,
  scrollLeft: 0,

  actions: {
    scrollChange(scrollLeft, scrollTop) {
      this.set('scrollLeft', scrollLeft);
      this.set('scrollTop', scrollTop);
    }
  },

  apodsSortingDesc: ['date:desc'],
  sortedByDate: computed.sort('model', 'apodsSortingDesc'),

  firstModelId: computed('sortedByDate', function () {
    return this.get('sortedByDate.firstObject.id');
  }),

  lastModelId: computed('sortedByDate', function () {
    return this.get('sortedByDate.lastObject.id');
  })

});
