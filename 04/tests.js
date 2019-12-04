const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

describe('Day 4', function() {
  describe('Part 1', function() {
    it('Test case 1', function() {
      assert.isTrue(part1(111111))
    })

    it('Test case 2', function() {
      assert.isFalse(part1(223450))
    })

    it('Test case 3', function() {
      assert.isFalse(part1(123789))
    })

    it('Test case 4', function() {
      assert.isFalse(part1(732211))
    })
  })

  describe('Part 2', function() {
    it('Test case 1', function() {
      assert.isTrue(part2(112233))
    })

    it('Test case 2', function() {
      assert.isFalse(part2(123444))
    })

    it('Test case 3', function() {
      assert.isTrue(part2(111122))
    })
  })
})
