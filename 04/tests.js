const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

describe('Day 4', function() {
  describe('Part 1', function() {
    it('111111 good', function() {
      assert.isTrue(part1(111111))
    })

    it('223450 bad', function() {
      assert.isFalse(part1(223450))
    })

    it('123789 bad ', function() {
      assert.isFalse(part1(123789))
    })

    it('732211 bad', function() {
      assert.isFalse(part1(732211))
    })
  })

  describe('Part 2', function() {
    it('112233 good', function() {
      assert.isTrue(part2(112233))
    })

    it('123444 bad', function() {
      assert.isFalse(part2(123444))
    })

    it('111122 good', function() {
      assert.isTrue(part2(111122))
    })
  })
})
