import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loadNext() {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = offset + limit;
      controller.set('offset', newOffset);

      return this.queryApods(newOffset, limit).then((apods) => {
        let model = controller.get('model');
        model.pushObjects(apods.get('content'));
      });
    },

    loadPrevious () {
      let controller = this.controllerFor('index');
      let limit = controller.get('limit');
      let offset = controller.get('offset');
      let newOffset = offset - limit;
      controller.set('offset', newOffset);

      return this.queryApods(newOffset, limit).then((apods) => {
        let model = controller.get('model');
        model.unshiftObjects(apods.get('content'));
      });
    }
  },

  queryApods (offset, limit) {
    return this.store.query('apod', {
      limit, offset
    })
    .catch(function (someError) {
      console.log(someError);
    });
  },

  reloadModel () {
    let ctrl = this.controllerFor('index');
    ctrl.set('model', this.store.peekAll('apod'));
    console.log('model update');
  },

  model ({ limit, offset }) {
    let model = this.modelFor('index');
    if (model && model.get('length') > 0) {
      return this.store.peekAll('apod');
    }

    return this.store.query('apod', { limit, offset });
  }

});
