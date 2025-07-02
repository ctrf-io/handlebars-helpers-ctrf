/*!
 * SPDX-License-Identifier: MIT
 * 
 * hasown <https://github.com/inspect-js/hasOwn>
 *
 * Copyright (c) Jordan Harband and contributors
 * Released under the MIT License.
 */

'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);