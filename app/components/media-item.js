import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['apod-media'],
  isImage: computed.equal('type', 'image'),
  isNoImage: computed.not('isImage'),

  isLoading: false,

  didReceiveAttrs () {
    let isImage = this.get('isImage');

    if (isImage) {
      fetch(this.get('src'), {
        mode: 'cors'
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.blob();
          } else {
            console.log('network error');
          }
        })
        .then((blob) => {
          console.log(blob);
          this.set('imageData', blob);
          this.set('isLoading', false);
        })
        .catch((error) => {
          console.error(error);
          this.set('isLoading', false);
        });

      Ember.run.later(this, function () {
        if (!this.get('imageData')) {
          this.set('isLoading', true);
        }
      }, 100);
    }
  }
});
