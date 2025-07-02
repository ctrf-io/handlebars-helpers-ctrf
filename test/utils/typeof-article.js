
/*!
 * SPDX-License-Identifier: MIT
 *
 * typeof-article <https://github.com/jonschlinkert/typeof-article>
 *
 * Copyright (c) 2017 Jon Schlinkert
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var type = require('../../lib/utils/typeof-article');

describe('typeof-article', function() {
  it('should export a function', function() {
    assert.equal(typeof type, 'function');
  });

  it('should expose a types object', function() {
    assert(type.types);
    assert.equal(typeof type.types, 'object');
  });

  it('should prefix the returned type with an indefinite article', function() {
    assert.equal(type({}), 'an object');
    assert.equal(type([]), 'an array');
    assert.equal(type(9), 'a number');
    assert.equal(type(null), 'null');
    assert.equal(type(undefined), 'undefined');
    assert.equal(type(/abc/), 'a regular expression');
    assert.equal(type(new WeakMap()), 'a WeakMap');
  });

  it('should get the native type', function() {
    assert.equal(type.typeOf(new WeakMap()), 'weakmap');
  });
});