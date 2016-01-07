import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('apod',  { path: '/apod/:apod_id' });
});

export default Router;
