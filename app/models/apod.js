import DS from 'ember-data';
import Ember from 'ember';

const attr = DS.attr;
const computed = Ember.computed;

export default DS.Model.extend({
  title: attr('string'),
  explanation: attr('string'),
  mediaType: attr('string'),
  url: attr('string'),
  hdurl: attr('string'),
  concepts: attr(),

  date: computed(function () {
    let id = this.get('id');
    let [year, month,  day] = id.split('-');
    return Date.UTC(year, month - 1, day);
  })
});
