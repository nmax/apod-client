/*global caches, self*/

self.addEventListener('fetch', function (event) {
 var requestURL = new URL(event.request.url);

  if (requestURL.hostname === 'apod.nasa.gov') {
    event.respondWith(respondFromImageCache(event.request));
  }
});

function respondFromImageCache (request) {
 return caches.match(request).then(function(response) {
    if (response) {
      return response;
    }

    return fetch(request.clone()).then(function(response) {
      caches.open('apod-imgs').then(function(cache) {
        cache.put(request, response).then(function() {
          console.log('yey img cache');
        }, function() {
          console.log('nay img cache');
        });
      });

      return response.clone();
    });
  });
}
