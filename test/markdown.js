'use strict';

require('mocha');
var assert = require('assert');
var fs = require('fs');
var hbs = require('handlebars').create();
var helpers = require('..');

// Directly register the markdown helpers
var markdown = require('../lib/markdown');
hbs.registerHelper('markdown', function(options) {
  if (typeof options === 'string') {
    return markdown.markdown(options);
  }
  return markdown.markdown(options);
});

hbs.registerHelper('md', function(fp, options) {
  return markdown.md(fp, options);
});

describe('markdown', function() {
  describe('markdown', function() {
    it('should render markdown using the {{#markdown}} block helper', function() {
      var template = hbs.compile('{{#markdown}}## {{../title}}{{/markdown}}');
      assert.equal(template({title: 'Markdown Test'}), '<h2>Markdown Test</h2>\n');
    });
  });

  describe('md', function() {
    it('should render markdown from a file using the {{md}} inline helper', function() {
      var expected = fs.readFileSync('test/expected/simple.html', 'utf8');
      var template = hbs.compile('{{{md fp}}}');
      var actual = template({fp: 'test/fixtures/simple.md'});
      assert.equal(actual, expected);
    });
  });
});
