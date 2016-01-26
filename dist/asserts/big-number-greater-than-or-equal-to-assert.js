'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bigNumberGreaterThanOrEqualToAssert;

var _validator = require('validator.js');

/**
 * Export `BigNumberGreaterThanOrEqualToAssert`.
 */

function bigNumberGreaterThanOrEqualToAssert(threshold) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThanOrEqualTo';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      const number = new BigNumber(value);

      if (!number.greaterThanOrEqualTo(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };

      if (e.name === 'BigNumber Error') {
        context.message = e.message;
      }

      throw new _validator.Violation(this, value, context);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];