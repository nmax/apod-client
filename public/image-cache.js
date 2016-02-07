/*global caches, self*/

function fileExtension (path) {
  var ext = path.substring(path.lastIndexOf('.') + 1);
  return ext;
}

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);
  var extension = fileExtension(requestUrl.href);
  var probe = {
    isImage: extension.match(/jpg|jpeg|gif|png|bmp|tiff/i),
    isVideo: requestUrl.href.match(/youtube|vimeo|embed/ig),
    fromApod: requestUrl.host === 'apod.nasa.gov'
  };

  if (probe.isImage || probe.isVideo || probe.fromApod) {
    event.respondWith(respondFromImageCache(event.request));
  }

  if (requestUrl.href.indexOf('api/apods') > -1) {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response) { return response; }

      return fetch(event.request.clone()).then(function (response) {
        if (!response.ok) { return response; }
        caches.open('apod-api').then(function(cache) {
          cache.put(event.request, response).then(function() {
            console.log('yey api cache');
          }, function() {
            console.log('nay api cache');
          });
        });

        return response.clone();
      });
    }));
  }
});

function respondFromImageCache (request) {
 return caches.match(request).then(function(response) {
    if (response) {
      return response;
    }

    return fetch(request.clone()).then(function(response) {
      if (!response.ok) { return response; }

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
