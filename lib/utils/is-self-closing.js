/*!
 * SPDX-License-Identifier: MIT
 *
 * is-self-closing <https://github.com/jonschlinkert/is-self-closing>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var tags = require('./self-closing-tags');

module.exports = function(name) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string');
  }
  return tags.indexOf(name.toLowerCase()) !== -1;
};