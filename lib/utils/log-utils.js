/*!
 * SPDX-License-Identifier: MIT
 *
 * log-utils <https://github.com/jonschlinkert/log-utils>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const timestamp = require('./time-stamp');
const colors = require('./ansi-colors');
const log = console.log;

/**
 * Get a red error symbol.
 *
 * ```js
 * console.log(log.error); //=> ✖
 * ```
 * @name .error
 * @api public
 */

getter(log, 'error', () => colors.red(colors.symbols.cross));

/**
 * Get a cyan info symbol.
 *
 * ```js
 * console.log(log.info); //=> ℹ
 * ```
 * @name .info
 * @api public
 */

getter(log, 'info', () => colors.cyan(colors.symbols.info));

/**
 * Get a green success symbol.
 *
 * ```js
 * console.log(log.success); //=> ✔
 * ```
 * @name .success
 * @api public
 */

getter(log, 'success', () => colors.green(colors.symbols.check));

/**
 * Get a yellow warning symbol.
 *
 * ```js
 * console.log(log.warning); //=> ⚠
 * ```
 * @name .warning
 * @api public
 */

getter(log, 'warning', () => colors.yellow(colors.symbols.warning));

/**
 * Get a formatted timestamp.
 *
 * ```js
 * console.log(log.timestamp); //=> [15:27:46]
 * ```
 * @name .timestamp
 * @api public
 */

getter(log, 'timestamp', () => {
  return '[' + colors.gray(timestamp('HH:mm:ss')) + ']';
});

/**
 * Returns a formatted string prefixed by a green check.
 *
 * ```js
 * console.log(log.ok('   foo'));
 * console.log(log.ok('  foo'));
 * console.log(log.ok(' foo'));
 * console.log(log.ok('foo'));
 * // Results in:
 * //    ✔ foo
 * //   ✔ foo
 * //  ✔ foo
 * // ✔ foo
 * ```
 * @name .ok
 * @api public
 */

log.ok = str => {
  let ok = colors.green(colors.symbols.check);
  return str.replace(/^(\s*)(.*?)$/, (m, s, v) => {
    return s + ok + ' ' + v;
  });
};

/**
 * Make the given text bold and underlined.
 *
 * ```js
 * console.log(log.heading('foo'));
 * // or
 * console.log(log.heading('foo', 'bar'));
 * ```
 * @name .heading
 * @api public
 */

log.heading = (...args) => {
  let str = args.filter(v => v !== void 0).map(String).join(' ');
  return colors.bold.underline(str);
};

/**
 * Utility for defining a getter
 */

function getter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: fn
  });
}

/**
 * Expose `log`
 */

log.__proto__ = colors;
module.exports = log;