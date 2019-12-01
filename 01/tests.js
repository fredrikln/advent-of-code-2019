let { assert } = require('chai');

describe('Day 1', function () {
  describe('Part 1', function () {
    const fuelReq = require('./part1');

    it('12', function () {
      assert.equal(fuelReq(12), 2);
    });

    it('14', function () {
      assert.equal(fuelReq(14), 2);
    });

    it('1969', function () {
      assert.equal(fuelReq(1969), 654);
    });

    it('100756', function () {
      assert.equal(fuelReq(100756), 33583);
    });
  });

  describe('Part 2', function () {
    const fuelReq = require('./part2');

    it('12', function () {
      assert.equal(fuelReq(12), 2);
    });

    it('14', function () {
      assert.equal(fuelReq(14), 2);
    });

    it('1969', function () {
      assert.equal(fuelReq(1969), 966);
    });

    it('100756', function () {
      assert.equal(fuelReq(100756), 50346);
    });
  });
});
