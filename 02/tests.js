let { assert } = require('chai');

const part1 = require('./part1');

describe('Day 2', function () {
  describe('Part 1', function () {
    it('1,0,0,0,99', function () {
      let input = '1,0,0,0,99';
      let output = part1(input);

      assert.equal(output.toString(), '2,0,0,0,99');
      assert.equal(output[0], 2);
    });

    it('2,3,0,3,99', function () {
      let input = '2,3,0,3,99';
      let output = part1(input);

      assert.equal(output.toString(), '2,3,0,6,99');
      assert.equal(output[0], 2);
    });

    it('2,4,4,5,99,0', function () {
      let input = '2,4,4,5,99,0';
      let output = part1(input);

      assert.equal(output.toString(), '2,4,4,5,99,9801');
      assert.equal(output[0], 2);
    });

    it('1,1,1,4,99,5,6,0,99', function () {
      let input = '1,1,1,4,99,5,6,0,99';
      let output = part1(input);

      assert.equal(output.toString(), '30,1,1,4,2,5,6,0,99');
      assert.equal(output[0], 30);
    });
  });

  describe('Part 2', function () {

  });
});
