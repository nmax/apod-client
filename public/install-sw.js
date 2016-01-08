navigator.serviceWorker.register('image-cache.js')
  .then(function () {
    console.log('installed successfully');
  })
  .catch(function (error) {
    console.log('Cannot install sw', error);
  });
