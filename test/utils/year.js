/*!
 * SPDX-License-Identifier: MIT
 *
 * year <https://github.com/jonschlinkert/year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var year = require('../../lib/utils/year');

describe('year()', function() {
  var currentYear = new Date().getUTCFullYear().toString();
  var shortYear = currentYear.substring(2, 4);

  it('should return the current year:', function() {
    year().should.equal(currentYear);
  });

  it('should return the 2-digit current year when YY is passed:', function() {
    year('YY').should.equal(shortYear);
  });

  it('should return the 4-digit current year when YYYY is passed:', function() {
    year('YYYY').should.equal(currentYear);
  });

  it('should return the 4-digit current year when yyyy is passed:', function() {
    year('yyyy').should.equal(currentYear);
  });
});