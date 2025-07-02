/*!
 * SPDX-License-Identifier: MIT
 *
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

const assert = require('assert');
const isObject = require('../../lib/utils/isobject');

it('should be true when the value is an object.', function() {
  assert(isObject({}));
  assert(isObject(Object.create({})));
  assert(isObject(Object.create(Object.prototype)));
  assert(isObject(Object.create(null)));
  assert(isObject(/foo/));

  function Foo() {}
  assert(isObject(new Foo));
  assert(isObject(new Foo()));
});

it('should be false when the value is not an object.', function() {
  assert(!isObject('whatever'));
  assert(!isObject(1));
  assert(!isObject(function() {}));
  assert(!isObject([]));
  assert(!isObject(['foo', 'bar']));
  assert(!isObject());
  assert(!isObject(undefined));
  assert(!isObject(null));
});