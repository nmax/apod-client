import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['apod-media'],
  isImage: computed.equal('item.mediaType', 'image'),
  isNoImage: computed.not('isImage'),

  isLoading: false,

  didReceiveAttrs () {
    this._super(...arguments);

    if (this.get('isImage')) {
      let isLoadingTimer = Ember.run.later(this, function () {
        if (!this.get('isLoaded')) {
          this.set('isLoading', true);
        }
      }, 300);

      this.set('isLoadingTimer', isLoadingTimer);

      let image = new Image();
      image.src = this.getAttr('item').get('url');
      image.setAttribute('data-apod-id', this.getAttr('item').get('id'));
      image.crossorigin = true;
      image.onload = (() => {
        if (!this.get('isDestroyed')) {
          this.set('isLoading', false);
          this.set('isLoaded', true);
          this.set('image', image);
        }
      });
    }
  },

  willDestroyElement () {
    Ember.run.cancel(this.get('isLoadingTimer'));
    this.set('image', null);
  }
});
