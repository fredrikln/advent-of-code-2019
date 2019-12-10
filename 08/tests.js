const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const getLayers = part1.getLayers
const countOccurences = part1.countOccurences

const generateImage = part2.generateImage

describe('Day 8', function() {
  describe('Part 1', function() {
    it('Test case 1', function() {
      const layers = getLayers('123456789012', 3, 2)

      assert.deepEqual(layers, ['123456', '789012'])
    })

    it('Test case 2', function() {
      const occurences = countOccurences('123456')

      assert.deepEqual(occurences, [
        0, 1, 1, 1, 1, 1, 1, 0, 0, 0
      ])
    })

    it('Test case 3', function() {
      const occurences = countOccurences('112233')

      assert.deepEqual(occurences, [
        0, 2, 2, 2, 0, 0, 0, 0, 0, 0
      ])
    })

    it('Test case 4', function() {
      assert.equal(part1('111111000000', 3, 2), 6*0) // 6 ones, 0 twos
      assert.equal(part1('000001111112', 3, 2), 5*1) // 5 ones, 1 two
      assert.equal(part1('000001222111', 3, 2), 3*3) // 3 ones, 3 twos
      assert.equal(part1('12120000', 2, 2), 2*2) // 2 ones, 2 twos
    })
  })

  describe('Part 2', function() {
    it('Test case 1', function() {
      const layers = getLayers('0222112222120000', 2, 2)
      const image = generateImage(layers, 2, 2)

      assert.equal(layers.length, 4)
      assert.equal(image.length, 4)
      assert.equal(image, '0110')
    })
  })
})
