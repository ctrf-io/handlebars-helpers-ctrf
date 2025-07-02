/*!
 * SPDX-License-Identifier: MIT
 *
 * is-odd <https://github.com/jonschlinkert/is-odd>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
const assert = require('assert');
const isOdd = require('../../lib/utils/is-odd');

describe('isOdd', function() {
  it('should return true if the number is odd:', function() {
    assert(!isOdd(0));
    assert(!isOdd(2));
    assert(isOdd(1));
    assert(isOdd(3));
    assert(isOdd(-1));
    assert(isOdd(-3));
    assert(isOdd(1.0e0));
    assert(isOdd(9007199254740991));
  });

  it('should work with strings:', function() {
    assert(!isOdd('0'));
    assert(!isOdd('2'));
    assert(isOdd('1'));
    assert(isOdd('3'));
    assert(isOdd('1.0e0'));
    assert(isOdd('9007199254740991'));
  });

  it('should throw an error when an invalid value is passed', function() {
    assert.throws(() => isOdd(), /expects a number/);
    assert.throws(() => isOdd('foo'), /expects a number/);
    assert.throws(() => isOdd('1.1e0'), /expects an integer/);
    assert.throws(() => isOdd(Math.pow(2, 53)), /value exceeds maximum safe integer/);
  });
});