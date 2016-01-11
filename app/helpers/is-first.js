import Ember from 'ember';

export default Ember.Helper.extend({
  compute (params) {
    let [index] = params;
    return index === 0;
  }
});
