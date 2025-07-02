/*!
 * SPDX-License-Identifier: MIT
 *
 * self-closing-tags <https://github.com/jonschlinkert/self-closing-tags>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var svgElements = [
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'use'
];

var voidElements = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

module.exports = voidElements.concat(svgElements);
module.exports.voidElements = voidElements;
module.exports.svgElements = svgElements;