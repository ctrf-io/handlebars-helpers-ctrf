/*!
 * SPDX-License-Identifier: MIT
 * 
 * handlebars-helper-create-frame <https://github.com/helpers/handlebars-helper-create-frame>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var helper = require('../../lib/utils/handlebars-helper-create-frame');

describe('handlebars-helper-create-frame', function() {
  it('should work as a handlebars helper', function() {
    handlebars.registerHelper('frame', helper);
    var fn = handlebars.compile('{{#frame site=site}}Name: {{@site.name}}{{/frame}}');
    assert.equal(fn({site: {name: 'Test'}}), 'Name: Test');
  });
});