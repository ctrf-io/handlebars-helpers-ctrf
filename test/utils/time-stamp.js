/*!
 * SPDX-License-Identifier: MIT
 *
 * time-stamp <https://github.com/jonschlinkert/time-stamp>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

require('mocha');
var assert = require('assert');
var pad = require('../../lib/utils/pad-left');
var timestamp = require('../../lib/utils/time-stamp');
var timestampUTC = require('../../lib/utils/time-stamp').utc;

describe('timestamp', function() {
  it('should return the default timestamp:', function() {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(timestamp()));
  });

  it('should work with delimiters', function() {
    assert(/^\[\d{4}\]/.test(timestamp('[YYYY]')));
    assert(/^\[\d{4}\d{2}\]/.test(timestamp('[YYYYMM]')));
    assert(/^\[\d{4}:\d{2}\]/.test(timestamp('[YYYY:MM]')));
  });

  it('should work with no separators', function() {
    assert(/^\d{4}\d{2}$/.test(timestamp('YYYYMM')));
    assert(/^\d{4}\d{2}\d{2}$/.test(timestamp('YYYYMMDD')));
    assert(/^\d{4}\d{2}\d{2}\d{2}$/.test(timestamp('YYYYMMDDss')));
    assert(/^\d{4}\d{2}\d{2}$/.test(timestamp('YYYYMMss')));
  });

  it('should return the year:', function() {
    assert(/^\d{4}$/.test(timestamp('YYYY')));
    assert(/^\d{4}$/.test(timestampUTC('YYYY')));
  });

  it('should return the month:', function() {
    assert(/^\d{2}$/.test(timestamp('MM')));
    assert(/^\d{2}$/.test(timestampUTC('MM')));
  });

  it('should return the day:', function() {
    assert(/^\d{2}$/.test(timestamp('DD')));
    assert(/^\d{2}$/.test(timestampUTC('DD')));
  });

  it('should return hours:', function() {
    assert(/^\d{2}$/.test(timestamp('HH')));
    assert(/^\d{2}$/.test(timestampUTC('HH')));
  });

  it('should return minutes:', function() {
    assert(/^\d{2}$/.test(timestamp('mm')));
    assert(/^\d{2}$/.test(timestampUTC('mm')));
  });

  it('should return seconds:', function() {
    assert(/^\d{2}$/.test(timestamp('ss')));
    assert(/^\d{2}$/.test(timestampUTC('ss')));
  });

  it('should return miliseconds:', function() {
    assert(/^\d{3}$/.test(timestamp('ms')));
    assert(/^\d{3}$/.test(timestampUTC('ms')));
  });

  it('should increment zero-based month:', function() {
    var expected = String(new Date().getUTCMonth() + 1);
    assert.equal(timestamp('MM'), pad(expected, 2, '0'));
  });

  it('should not increment one-based methods:', function() {
    var expected = String(new Date().getUTCFullYear());
    assert.equal(timestamp('YYYY'), pad(expected, 4, '0'));
  });

  it('should return the 2 digit year for a given date', function() {
    var date = new Date(2019, 0);
    var expectedYear = "19";

    assert.equal(timestamp('YY', date), expectedYear);
    assert.equal(timestampUTC('YY', date), expectedYear);
  });

});