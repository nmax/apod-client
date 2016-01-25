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
