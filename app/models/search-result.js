import DS from 'ember-data';
import Apod from './apod';

const attr = DS.attr;

export default Apod.extend({

  titleMatches: attr(),
  explanationMatches: attr()

});
