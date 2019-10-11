
/**
 * Module dependencies.
 */

const IpAssert = require('../../src/asserts/ip-assert');
const should = require('should');
const { Assert: BaseAssert, Validator, Violation } = require('validator.js');

/**
 * Extend `Assert` with `IpAssert`.
 */

const Assert = BaseAssert.extend({
  Ip: IpAssert
});

/**
 * Test `IpAssert`.
 */

describe('IpAssert', () => {
  it('should throw an error if the input value is not a valid string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().Ip().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the ip is invalid', () => {
    try {
      new Assert().Ip().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('FOO');
    }
  });

  it('should expose `assert` equal to `Ip`', () => {
    try {
      new Assert().Ip().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Ip');
    }
  });

  it('should accept valid ips', () => {
    ['1.3.3.7', '::1'].forEach(choice => {
      new Assert().Ip().validate(choice);
    });
  });
});
