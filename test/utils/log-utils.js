/*!
 * SPDX-License-Identifier: MIT
 *
 * log-utils <https://github.com/jonschlinkert/log-utils>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Released under the MIT License.
 */

require('mocha');
const assert = require('assert');
const log = require('../../lib/utils/log-utils');

describe('log-utils', function() {
  it('should export a function', function() {
    assert(log);
    assert.equal(typeof log, 'function');
  });

  it('should expose getters', function() {
    assert(log.symbols);
    assert(log.symbols.hasOwnProperty('check'));

    assert(log.symbols.hasOwnProperty('cross'));
    assert(log.symbols.hasOwnProperty('check'));
    assert(log.symbols.hasOwnProperty('info'));
    assert(log.symbols.hasOwnProperty('warning'));

    assert.equal(typeof log.green, 'function');
    assert.equal(typeof log.cyan, 'function');
    assert.equal(typeof log.yellow, 'function');
    assert.equal(typeof log.red, 'function');

    assert(log.hasOwnProperty('error'));
    assert(log.hasOwnProperty('info'));
    assert(log.hasOwnProperty('success'));
    assert(log.hasOwnProperty('warning'));
  });
});