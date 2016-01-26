import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loadNext() {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = offset + limit;
      controller.set('offset', newOffset);

      return this.queryApods(newOffset, limit).then(() => {
        controller.set('model', this.store.peekAll('apod'));
      });
    },

    loadPrevious () {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = Math.max(offset - limit, 0);
      controller.set('offset', newOffset);

      return this.queryApods(newOffset, limit).then(() => {
        controller.set('model', this.store.peekAll('apod'));

        let scrollTop = controller.get('scrollTop');
        if (!scrollTop || scrollTop <= 0) {
          //TODO: remove magic numbers 
          // item-height * query-limit
          controller.set('scrollTop', 200 * 15);
        } else if (scrollTop > 0) {
          controller.set('scrollTop', scrollTop + (200 * 15));
        }
      });
    }
  },

  queryApods (offset, limit) {
    return this.store.query('apod', { limit, offset })
      .catch(function (someError) {
        console.log(someError);
      });
  },

  model ({ limit, offset }) {
    let model = this.modelFor('index');
    if (model && model.get('length') > 0) {
      return this.store.peekAll('apod');
    }

    return this.store.query('apod', { limit, offset });
  }

});
