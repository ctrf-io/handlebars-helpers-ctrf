/*!
 * SPDX-License-Identifier: MIT
 * 
 * handlebars-utils <https://github.com/helpers/handlebars-utils>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('../../../lib/utils/handlebars-utils');

function render(str, locals) {
  return handlebars.compile(str)(locals);
}

handlebars.registerHelper('test', function(val, options) {
  return utils.inverse(val, options);
});

describe('.inverse', function() {
  it('should return value as an expression', function() {
    assert.equal(render('{{test "foo"}}'), 'foo');
    assert.equal(render('{{test foo}}'), '');
  });

  it('should return value as a block', function() {
    assert.equal(render('{{#test}}foo{{/test}}'), '');
    assert.equal(render('{{#test bar}}foo{{/test}}'), '');
    assert.equal(render('{{#test "bar"}}foo{{/test}}'), '');

    assert.equal(render('{{#test undef}}foo{{else}}bar{{/test}}'), 'bar');
    assert.equal(render('{{#test bar}}foo{{else}}bar{{/test}}'), 'bar');
    assert.equal(render('{{#test "bar"}}foo{{else}}bar{{/test}}'), 'bar');
  });
});
