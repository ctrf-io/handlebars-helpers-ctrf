'use strict';

/**
 * Simple template engine for testing
 */
module.exports = function() {
  var app = {};
  
  app.views = {};
  app.engines = {};
  app.helpers = function(helpers) {
    app._helpers = helpers;
    return app;
  };
  
  app.engine = function(ext, fn) {
    app.engines[ext] = fn;
    return app;
  };
  
  app.option = function(key, val) {
    app._options = app._options || {};
    app._options[key] = val;
    return app;
  };
  
  app.view = function(view) {
    if (!view) return null;
    app.views[view.path] = view;
    return view;
  };
  
  app.compile = function(view) {
    if (!view) return { fn: function() { return ''; } };
    var ext = app._options.engine || 'hbs';
    var engine = app.engines[ext];
    
    if (typeof engine.compile !== 'function') {
      return { fn: function(context) { return view.content; } };
    }
    
    return engine.compile(view.content);
  };
  
  return app;
}; 