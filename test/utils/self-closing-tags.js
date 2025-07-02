/*!
 * SPDX-License-Identifier: MIT
 *
 * self-closing-tags <https://github.com/jonschlinkert/self-closing-tags>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var tags = require('../../lib/utils/self-closing-tags');

describe('self-closing-tags', function() {
  it('should export an array of strings', function() {
    assert(Array.isArray(tags));
    assert(tags.length > 1);
    assert.equal(typeof tags[0], 'string');
  });

  it('should expose a ".voidElements" property', function() {
    assert(Array.isArray(tags.voidElements));
    assert(tags.voidElements.length > 1);
    assert.equal(typeof tags.voidElements[0], 'string');
  });

  it('should expose a ".svgElements" property', function() {
    assert(Array.isArray(tags.svgElements));
    assert(tags.svgElements.length > 1);
    assert.equal(typeof tags.svgElements[0], 'string');
  });
});