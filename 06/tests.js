const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

describe('Day 6', function() {
  describe('Part 1', function() {
    it('Test case 1', function() {
      const testData = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
      ]

      assert.equal(part1(testData), 42)
    })
  })

  describe('Part 2', function() {
    it('Test case 1', function() {
      const testData = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN',
      ]

      assert.equal(part2(testData), 4)
    })
  })
})
