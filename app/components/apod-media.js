import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  tagName: '',
  isVideo: computed.equal('type', 'video'),
  isImage: computed.equal('type', 'image')
});
