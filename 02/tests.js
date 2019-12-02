let { assert } = require('chai');

const { intcode, parseMemoryFromString } = require('../utils/intcode');

describe('Day 2', function () {
  describe('Part 1', function () {
    it('1,0,0,0,99', function () {
      let input = parseMemoryFromString('1,0,0,0,99');
      let output = intcode(input);

      assert.equal(output.toString(), '2,0,0,0,99');
      assert.equal(output[0], 2);
    });

    it('2,3,0,3,99', function () {
      let input = parseMemoryFromString('2,3,0,3,99');
      let output = intcode(input);

      assert.equal(output.toString(), '2,3,0,6,99');
      assert.equal(output[0], 2);
    });

    it('2,4,4,5,99,0', function () {
      let input = parseMemoryFromString('2,4,4,5,99,0');
      let output = intcode(input);

      assert.equal(output.toString(), '2,4,4,5,99,9801');
      assert.equal(output[0], 2);
    });

    it('1,1,1,4,99,5,6,0,99', function () {
      let input = parseMemoryFromString('1,1,1,4,99,5,6,0,99');
      let output = intcode(input);

      assert.equal(output.toString(), '30,1,1,4,2,5,6,0,99');
      assert.equal(output[0], 30);
    });
  });

  describe('Part 2', function () {

  });
});
