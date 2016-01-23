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

      if (this.checkHitStart(scrollTop)) {
        this.send('loadPrevious');
      }

      if (this.checkHitEnd(scrollTop)) {
        this.send('loadNext');
      }
    }
  },

  checkHitEnd (scrollTop) {
    let windowHeight = this.get('windowHeight');
    let listHeight = this.get('listHeight');
    return scrollTop + windowHeight === listHeight;
  },

  checkHitStart (scrollTop) {
    return scrollTop === 0;
  },

  listHeight: computed('sortedByDate', function () {
    return Ember.$('.apod-list > .ember-view > div').height();
  }),

  windowHeight: computed(function () {
    return window.innerHeight;
  }),

  apodsSortingDesc: ['date:desc'],
  sortedByDate: computed.sort('model', 'apodsSortingDesc'),

  firstModelId: computed('sortedByDate', function () {
    return this.get('sortedByDate.firstObject.id');
  }),

  lastModelId: computed('sortedByDate', function () {
    return this.get('sortedByDate.lastObject.id');
  })

});
