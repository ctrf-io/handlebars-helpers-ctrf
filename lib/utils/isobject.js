/*!
 * SPDX-License-Identifier: MIT
 *
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

module.exports = function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  };