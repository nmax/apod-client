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
  copyright: attr('string'),

  nextModelId: attr('string'),
  previousModelId: attr('string'),

  date: computed(function () {
    let id = this.get('id');
    let [year, month,  day] = id.split('-').map((n) => parseInt(n, 10));
    return Date.UTC(year, month - 1, day);
  }),
});
