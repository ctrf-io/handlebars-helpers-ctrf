/*!
 * SPDX-License-Identifier: MIT
 * 
 * create-frame <https://github.com/jonschlinkert/create-frame>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('./define-property', 'define');
require('./extend-shallow', 'extend');
require('./isobject', 'isObject');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;