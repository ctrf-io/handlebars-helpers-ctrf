'use strict';

// Array utils
var sortBy = require('./array-sort');
var flatten = require('./arr-flatten');

// Html utils
var block = require('./to-gfm-code-block');
var tag = require('./html-tag');

// JavaScript language utils
var typeOf = require('./kind-of');

// matching utils
var isGlob = require('./is-glob');
var mm = require('micromatch');
var falsey = require('./falsey');

// Number utils
var isEven = require('./is-even');
var isNumber = require('is-number');

// Object utils
var createFrame = require('./create-frame');
var getObject = require('./get-object');
var get = require('./get-value');
var forOwn = require('./for-own');

// Path utils
var relative = require('./relative');

/**
 * Expose `utils`
 */

module.exports = {
  sortBy: sortBy,
  flatten: flatten,
  block: block,
  tag: tag,
  typeOf: typeOf,
  isGlob: isGlob,
  mm: mm,
  falsey: falsey,
  isEven: isEven,
  isNumber: isNumber,
  createFrame: createFrame,
  getObject: getObject,
  get: get,
  forOwn: forOwn,
  relative: relative
};
