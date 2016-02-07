import Ember from 'ember';

function dateToYYMMDD(date, sep='-') {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (('' + month).length < 2) {
    month = '0' + month;
  }

  if (( '' + day).length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join(sep);
}

function unrollFindMany (store, offset, limit) {
    let batch = [];
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();

    for (let i = 0; i < limit; i += 1) {
      let date = new Date(Date.UTC(year, month, day - offset - i));
      batch.push(dateToYYMMDD(date));
    }

    return Ember.RSVP.all(batch.map((id) => store.find('apod', id)));
}

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
          controller.set('scrollTop', 200 * 8);
        } else if (scrollTop > 0) {
          controller.set('scrollTop', scrollTop + (200 * 8));
        }
      });
    }
  },

  queryApods (offset, limit) {
    return unrollFindMany(this.store, offset, limit);
  },

  model ({ limit, offset }) {
    let model = this.modelFor('index');
    if (model && model.get('length') > 0) {
      return this.store.peekAll('apod');
    }

    return unrollFindMany(this.store, offset, limit);
  }

});
