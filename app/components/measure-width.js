import Ember from 'ember';

export default Ember.Component.extend({

  measure () {
    return this.$().width();
  },

  didInsertElement () {
    this._super(...arguments);

    this.setupResize();
    this.handleResize();
  },

  setupResize () {
    let id = Ember.guidFor(this);
    let evtName = `resize.${id}`;
    this.set('evtName', evtName);

    console.log(evtName);
    Ember.$(window).on(evtName, () => this.handleResize());
  },

  handleResize () {
    let w = this.measure();
    this.set('measuredWidth', w);
  },

  willDestroyElement () {
    let evtName = this.get('evtName');
    Ember.$(window).off(evtName);
  }

});
