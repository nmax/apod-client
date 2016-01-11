import Ember from 'ember';

export default Ember.Helper.extend({
  compute (params) {
    let [index] = params;
    if (index === 0) {
      console.log('YOYOYOYOYOY');
    } else {
      console.log(index);
    }
    return index === 0;
  }
});
