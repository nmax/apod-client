import Ember from 'ember';

const {Waypoint} = window;

const {on} = Ember;

function notify (message) {
  if (Notification.permission === 'granted') {
    new Notification(message);
  } else if (Notification.permission === 'denied') {

  } else {
    Notification.requestPermission(function () {
      notify(message);
    });
  }
}

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['button', 'expand', 'load-more'],

  click () {
    this.sendAction('action');
  },

  didInsertElement () {
    this._super(...arguments);

    //let waypoint = new Waypoint({
      //handler: function (direction) {
        //console.log(direction);
      //},
      //element: this.get('element'),
      //context: document.querySelector('.apod-list'),
      //enabled: false
    //});

    //if (this.get('isVisible')) {
      //waypoint.enable();
    //}

    //this.set('waypoint', waypoint);
  },

  enableWaypoint: on('becameVisible', function() {
    var waypoint = this.get('waypoint');
    waypoint.enable();
  }),

  disableWaypoint: on('becameHidden', function() {
    var waypoint = this.get('waypoint');
    waypoint.disable();
  }),

  willDestroyElement () {
    this._super(...arguments);

    let waypoint = this.get('waypoint');
    if (waypoint) {
      waypoint.destroy();
    }
  }
});
