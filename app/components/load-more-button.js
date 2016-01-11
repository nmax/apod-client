import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['button', 'expand', 'load-more'],

  click () {
    this.sendAction('action');
    this.set('isVisible', false);
  }
});
