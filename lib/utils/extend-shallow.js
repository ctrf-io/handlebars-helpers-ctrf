/*!
 * SPDX-License-Identifier: MIT
 * 
 * extend-shallow <https://github.com/jonschlinkert/extend-shallow>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isExtendable = require('./is-extendable');
var assignSymbols = require('./assign-symbols');

module.exports = Object.assign || function(obj/*, objects*/) {
  if (obj === null || typeof obj === 'undefined') {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  // Handle primitives
  if (typeof obj === 'number' || 
      typeof obj === 'string' || 
      typeof obj === 'boolean' || 
      typeof obj === 'symbol') {
    return {};
  }
  
  // Ensure obj is an object
  var target = Object(obj);
  
  // Return target if not extendable and not a primitive
  if (!isExtendable(target)) {
    return target;
  }

  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isString(val)) {
      val = toObject(val);
    }
    if (isObject(val)) {
      assign(target, val);
      assignSymbols(target, val);
    }
  }
  return target;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

function isString(val) {
  return (val && typeof val === 'string');
}

function toObject(str) {
  var obj = {};
  for (var i in str) {
    obj[i] = str[i];
  }
  return obj;
}

function isObject(val) {
  return (val && typeof val === 'object') || isExtendable(val);
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isEnum(obj, key) {
  return Object.prototype.propertyIsEnumerable.call(obj, key);
}