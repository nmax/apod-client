import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['offset', 'limit', 'scrollTop'],

  offset: 0,
  limit: 8,

  scrollTop: 0,
  scrollLeft: 0,

  actions: {
    scrollChange(scrollLeft, scrollTop) {
      this.set('scrollLeft', scrollLeft);
      this.set('scrollTop', scrollTop);

      if (this.checkHitStart(scrollTop)) {
        Ember.run.debounce(this, function () {
          this.send('loadPrevious');
        }, 1000);
      }

      if (this.checkHitEnd(scrollTop)) {
        Ember.run.debounce(this, function () {
          this.send('loadNext');
        }, 1000);
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
