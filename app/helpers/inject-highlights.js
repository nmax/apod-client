import Ember from 'ember';

const htmlSafe = Ember.String.htmlSafe;

export function injectHighlights (params) {
  let [text, matches] = params;
  let newText = text;

  if (!matches || matches.length === 0) {
    return text;
  }

  let wrapInHightlight = function (wrapee) {
    return `<span class="highlight">${wrapee}</span>`;
  };

  let increasedOffset = 0;

  matches.forEach(function ([start, end]) {
    let match = text.substring(start, end);
    let wrapped = wrapInHightlight(match);

    let adjustedStart = start + increasedOffset;
    let adjustedEnd = end + increasedOffset;

    newText = newText.slice(0, adjustedStart)
                     .concat(wrapped)
                     .concat(newText.slice(adjustedEnd, newText.length));

    increasedOffset += (wrapped.length - match.length);
  });

  return htmlSafe(newText);
}

export default Ember.Helper.helper(injectHighlights);
