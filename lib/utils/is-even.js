/*!
 * SPDX-License-Identifier: MIT
 * 
 * is-even <https://github.com/jonschlinkert/is-even>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isNumber = require('./is-number');

module.exports = function isEven(i) {
  if (!isNumber(i)) {
    throw new TypeError('expects a number.');
  }
  
  if (!Number.isInteger(Number(i))) {
    throw new Error('expects an integer.');
  }
  
  return (i % 2) === 0;
};