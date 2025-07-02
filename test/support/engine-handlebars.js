'use strict';

var handlebars = require('handlebars');

/**
 * Simple handlebars engine for testing
 */
module.exports = {
  compile: function(str, options) {
    return handlebars.compile(str, options);
  },
  render: function(str, context, options) {
    return handlebars.compile(str, options)(context);
  }
}; 