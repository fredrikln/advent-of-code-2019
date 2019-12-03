let { assert } = require('chai');

const { intcode, parseMemoryFromString } = require('../utils/intcode');

const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 3', function () {
  describe('Part 1', function () {
    it('Test case 1', function () {
      let data = [
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83'
      ];

      assert.equal(part1(data), 159);
    });

    it('Test case 2', function () {
      let data = [
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
      ];

      assert.equal(part1(data), 135);
    });

    it('Test case 3', function () {
      let data = [
        'R2,U2,U2,R2',
        'U2,R2,R2,U2'
      ];

      assert.equal(part1(data), 4);
    });

    it('Test case 4', function () {
      let data = [
        'R8,U5,L5,D3',
        'U7,R6,D4,L4'
      ];

      assert.equal(part1(data), 6);
    });
  });

  describe('Part 2', function () {
    it('Test case 1', function () {
      let data = [
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83'
      ];

      assert.equal(part2(data), 610);
    });

    it('Test case 2', function () {
      let data = [
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
      ];

      assert.equal(part2(data), 410);
    });

    it('Test case 3', function () {
      let data = [
        'R8,U5,L5,D3',
        'U7,R6,D4,L4'
      ];

      assert.equal(part2(data), 30);
    });
  });
});
