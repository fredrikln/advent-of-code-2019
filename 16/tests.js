const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

describe('Day 16', function() {
  describe('Part 1', function() {
    it('Test case 0', function() {
      assert.equal(part1('12345678', 1), '48226158')
      assert.equal(part1('12345678', 2), '34040438')
      assert.equal(part1('12345678', 3), '03415518')
      assert.equal(part1('12345678', 4), '01029498')
    })

    it('Test case 1', function() {
      assert.equal(part1('80871224585914546619083218645595', 100), '24176176')
    })

    it('Test case 2', function() {
      assert.equal(part1('19617804207202209144916044189917', 100), '73745418')
    })

    it('Test case 3', function() {
      assert.equal(part1('69317163492948606335995924319873', 100), '52432133')
    })
  })

  describe('Part 2', function() {
    it('Test case 1', function() {
      assert.equal(part2('03036732577212944063491565474664'), '84462026')
    })

    it('Test case 2', function() {
      assert.equal(part2('02935109699940807407585447034323'), '78725270')
    })

    it('Test case 3', function() {
      assert.equal(part2('03081770884921959731165446850517'), '53553731')
    })
  })
})
