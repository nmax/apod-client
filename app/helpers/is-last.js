import Ember from 'ember';

export default Ember.Helper.extend({
  compute (params) {
    let [items, index] = params;
    let len = items.get('length');
    return index === (len - 1);
  }
});
