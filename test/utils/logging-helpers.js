/*!
 * SPDX-License-Identifier: MIT
 *
 * logging-helpers <https://github.com/jonschlinkert/logging-helpers>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert
 * Released under the MIT License.
 */

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var isObject = require('./isobject');
var helpers = require('../../lib/utils/logging-helpers');

// Store original write functions
var originalStdoutWrite = process.stdout.write;
var originalStderrWrite = process.stderr.write;

// Create history arrays
var stdoutHistory = [];
var stderrHistory = [];

function render(str, ctx) {
  var hbs = handlebars.create();
  hbs.registerHelper(helpers);
  return hbs.compile(str)(ctx);
}

describe('logging helpers', function() {
  beforeEach(function() {
    stdoutHistory = [];
    stderrHistory = [];

    process.stdout.write = function(str) {
      stdoutHistory.push(str);
      return originalStdoutWrite.apply(process.stdout, arguments);
    };

    process.stderr.write = function(str) {
      stderrHistory.push(str);
      return originalStderrWrite.apply(process.stderr, arguments);
    };
  });

  afterEach(function() {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  });

  describe('{{log}}', function() {
    it('should log a message to stdout', function() {
      render('{{log "Log helper worked!"}}');
      assert(/Log helper worked!/.test(stdoutHistory.join('')));
    });
  });

  describe('{{warn}}', function() {
    it('should log a warning message to stdout', function() {
      render('{{warn "warn helper worked!"}}');
      assert(/warn helper worked!/.test(stderrHistory.join('')));
    });
  });

  describe('{{success}}', function() {
    it('should log a success message to stdout', function() {
      render('{{success "success helper worked!"}}');
      assert(/success helper worked!/.test(stdoutHistory.join('')));
    });
  });

  describe('{{ok}}', function() {
    it('should log an "ok" message to stdout', function() {
      render('{{ok "ok helper worked!"}}');
      assert(/ok helper worked!/.test(stdoutHistory.join('')));
    });
  });

  describe('{{info}}', function() {
    it('should log an info message to stdout', function() {
      render('{{info "info helper worked!"}}');
      assert(/info helper worked!/.test(stdoutHistory.join('')));
    });
  });

  describe('{{error}}', function() {
    it('should log an error message to stdout', function() {
      render('{{error "error helper worked!"}}');
      assert(/error helper worked!/.test(stderrHistory.join('')));
    });
  });

  describe('{{_debug}}', function() {
    it('should log current context to stderr', function() {
      render('{{_debug this}}', 'foo');
      assert(/foo/.test(stderrHistory.join('')));
    });
  });
});