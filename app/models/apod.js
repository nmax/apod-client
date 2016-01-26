import DS from 'ember-data';
import Ember from 'ember';

const attr = DS.attr;
const computed = Ember.computed;

function dateToYYMMDD(date, sep='-') {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (('' + month).length < 2) {
    month = '0' + month;
  }

  if (( '' + day).length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join(sep);
}

function test (model) {
  let id = model.get('id');
  let [year, month,  day] = id.split('-').map((n) => parseInt(n, 10));
  let dayAfter = new Date(Date.UTC(year, month - 1, day + 1));
  return dateToYYMMDD(dayAfter);
}

export default DS.Model.extend({
  title: attr('string'),
  explanation: attr('string'),
  mediaType: attr('string'),
  url: attr('string'),
  hdurl: attr('string'),
  concepts: attr(),

  date: computed(function () {
    let id = this.get('id');
    let [year, month,  day] = id.split('-').map((n) => parseInt(n, 10));
    return Date.UTC(year, month - 1, day);
  }),


  nextModelId: computed('id', function () {
    let id = this.get('id');
    let [year, month,  day] = id.split('-').map((n) => parseInt(n, 10));
    let dayAfter = new Date(Date.UTC(year, month - 1, day + 1));
    return dateToYYMMDD(dayAfter);
  }),

  previousModelId: computed('id', function () {
    let id = this.get('id');
    let [year, month,  day] = id.split('-').map((n) => parseInt(n, 10));
    let dayBefore = new Date(Date.UTC(year, month - 1, day - 1));
    return dateToYYMMDD(dayBefore);
  })
});
