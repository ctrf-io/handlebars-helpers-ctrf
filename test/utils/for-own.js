/*!
 * SPDX-License-Identifier: MIT
 *
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var forOwn = require('../../lib/utils/for-own');

describe('forOwn', function() {
  it('should expose keys and values from the given object', function() {
    var obj = {a: 'foo', b: 'bar', c: 'baz'};
    var values = [];
    var keys = [];

    forOwn(obj, function(value, key, o) {
      assert.deepEqual(o, obj);
      keys.push(key);
      values.push(value);
    });

    assert.deepEqual(keys, ['a', 'b', 'c']);
    assert.deepEqual(values, ['foo', 'bar', 'baz']);
  });
});