const duration = 900;
const easing = [200, 15]; // [ tension, friction ]

export default function () {

  this.transition(
    this.toRoute('apod'),
    this.use('explode', {
      matchBy: 'data-apod-id',
      use: ['fly-to', { duration, easing }]
    }, {
      pickNew: '.info-col',
      use: ['toRight', { duration }]
    }, {
      use: ['fade', { duration: duration / 2 }]
    }),
    this.reverse('explode', {
      pickOld: '.info-col',
      use: ['toLeft', { duration }]
    }, {
      matchBy: 'data-apod-id',
      use: ['fly-to', { duration, easing }]
    }, {
      use: ['fade', { duration: duration / 2 }]
    })
  );

}
