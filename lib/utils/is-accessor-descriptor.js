/*!
 * SPDX-License-Identifier: MIT
 * 
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var hasOwn = require('hasown');
var gOPD = require('gopd');

var isObject = function (val) {
	return val !== null && typeof val === 'object' && !Array.isArray(val);
};

module.exports = function isAccessorDescriptor(obj, key, checkProto) {
	if (!isObject(obj)) {
		return false;
	}

	if (arguments.length > 1) {
		var hasKey = hasOwn(obj, key);
		if (!hasKey && checkProto !== false) {
			return isAccessorDescriptor(obj.constructor.prototype, key, false);
		}
		return gOPD ? isAccessorDescriptor(gOPD(obj, key)) : hasKey;
	}

	var desc = obj;
	// An accessor descriptor must have at least one of 'get' or 'set'
	if (
		(!hasOwn(desc, 'get') && !hasOwn(desc, 'set'))
		|| !hasOwn(desc, 'configurable')
	) {
		return false;
	}

	for (var descKey in desc) { // eslint-disable-line no-restricted-syntax
		if (hasOwn(desc, descKey)) {
			if (
				descKey !== 'get'
				&& descKey !== 'set'
				&& descKey !== 'enumerable'
				&& descKey !== 'configurable'
			) {
				return false;
			}

			var val = desc[descKey];
			if (descKey === 'get' || descKey === 'set') {
				if (typeof val !== 'undefined' && typeof val !== 'function') {
					return false;
				}
			} else if (typeof val !== 'boolean') {
				return false;
			}
		}
	}
	return true;
};