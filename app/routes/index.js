import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loadNext() {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = offset + limit;
      controller.set('offset', newOffset);

      let query = this.store.query('apod', {
        limit,
        offset: newOffset
      });

      return query
        .then(() => {
          controller.set('model', this.store.peekAll('apod'));
        });
    },

    loadPrevious () {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = offset - limit;
      controller.set('offset', newOffset);

      let query = this.store.query('apod', {
        limit,
        offset: newOffset
      });

      return query
        .then(() => {
          controller.set('model', this.store.peekAll('apod'));
        });
    }
  },

  model ({ limit, offset }) {
    let model = this.modelFor('index');
    if (model && model.get('length') > 0) {
      return this.store.peekAll('apod');
    }

    return this.store.query('apod', { limit, offset });
  }

});
