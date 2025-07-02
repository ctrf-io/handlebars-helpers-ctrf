'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var utils = require('./utils/utils');

// Configure marked to match expected output from tests
marked.use({
  headerIds: false, // Prevent IDs from being added to headers
  mangle: false
});

/**
 * Block helper that converts a string of markdown to HTML.
 *
 * ```handlebars
 * {{#markdown}}
 * # Heading
 *
 * > blockquote
 * {{/markdown}}
 * ```
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

function markdown(options) {
  if (typeof options === 'string') {
    return marked.parse(options);
  }
  // We need to specially handle Handlebars variables in the content
  var content = options.fn(this).replace(/<\/?p>/g, '');
  return marked.parse(content);
}

/**
 * Read a markdown file from the file system and inject its contents as markdown.
 *
 * ```handlebars
 * {{md "foo/bar.md"}}
 * ```
 * @param {String} `fp` File path of the markdown file to read.
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

function md(fp, options) {
  if (utils.typeOf(fp) === 'object') {
    options = fp;
    fp = null;
  }

  // if not a string, use the options.fn content
  if (typeof fp !== 'string') {
    if (typeof options === 'object' && typeof options.fn === 'function') {
      fp = options.fn(this);
    } else {
      return '';
    }
  }

  // Resolve the file path in case it's relative
  var filePath = fp;
  if (!path.isAbsolute(fp)) {
    filePath = path.resolve(process.cwd(), fp);
  }

  if (!fs.existsSync(filePath)) {
    console.error('Cannot find markdown file:', filePath);
    return '';
  }

  var content = fs.readFileSync(filePath, 'utf8');
  return marked.parse(content);
}

/**
 * Register markdown helpers with Handlebars
 */
function register(options) {
  var opts = options || {};
  var hbs = opts.handlebars;

  if (!hbs) {
    return exports;
  }

  hbs.registerHelper('markdown', markdown);
  hbs.registerHelper('md', md);

  return exports;
}

/**
 * Expose `markdown` helpers
 */

exports = module.exports = register;
exports.markdown = markdown;
exports.md = md;
