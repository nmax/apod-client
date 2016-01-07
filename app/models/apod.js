import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  title: attr('string'),
  explanation: attr('string'),
  mediaType: attr('string'),
  url: attr('string'),
  hdurl: attr('string'),
  concepts: attr()
});
