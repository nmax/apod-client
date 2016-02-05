import Ember from 'ember';
import { injectHighlights } from '../../../helpers/inject-highlights';
import { module, test } from 'qunit';

const htmlSafe = Ember.String.htmlSafe;

module('Unit | Helper | inject hightlights');

test('highlights one match correctly', function(assert) {
  let text = 'I wear a Feez now. Feezes are cool.';
  let matches = [ [9, 13]];
  let expected = htmlSafe('I wear a <span class="highlight">Feez</span> now. Feezes are cool.');
  let result = injectHighlights([text, matches]);

  assert.equal(result.toHTML(), expected.toHTML());
});

test ('hightlights multiple matches correctly', function (assert) {
  let text = 'Never ignore coincidence. Unless, of course, you’re busy. In which case, always ignore coincidence.';
  let expected = htmlSafe('Never ignore <span class="highlight">coincidence</span>. Unless, of course, you’re busy. In which case, always ignore <span class="highlight">coincidence</span>.');
  let matches = [[13, 24],  [87, 98]];
  let result = injectHighlights([text, matches]);

  assert.equal(result.toHTML(), expected.toHTML());
});
