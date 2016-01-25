import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['apod-media'],
  isImage: computed.equal('item.mediaType', 'image'),
  isNoImage: computed.not('isImage'),

  isLoading: false,

  didReceiveAttrs () {
    this._super(...arguments);
    this.set('isLoading', true);

    let image = new Image();
    image.src = this.getAttr('item').get('url');
    image.setAttribute('data-apod-id', this.getAttr('item').get('id'));
    image.crossorigin = true;
    image.onload = (() => {
      this.set('isLoading', false);
      this.set('image', image);
    });
  }
});
