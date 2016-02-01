import JSONAPISerializer from 'ember-data/serializers/json-api';

function idFromLink (link) {
  return link.substring(link.lastIndexOf('/') + 1);
}

export default JSONAPISerializer.extend({

  extractAttributes(model, resourceHash) {
    let attrs = this._super(model, resourceHash);

    if (resourceHash.links.next) {
      attrs.nextModelId = idFromLink(resourceHash.links.next);
    }

    if (resourceHash.links.previous) {
      attrs.previousModelId = idFromLink(resourceHash.links.previous);
    }

    return attrs;
  }
});
