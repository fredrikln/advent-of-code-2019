const { assert } = require('chai') // eslint-disable-line no-unused-vars

const { parseMemoryFromString, intcode } = require('../utils/intcode')

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const { runConfiguration } = require('./part1')
const part2 = require('./part2') // eslint-disable-line no-unused-vars
const { runConfiguration: runConfiguration2 } = require('./part2')

describe('Day 7', function() {
  describe('Part 1', function() {
    it('Test case 1', function() {
      const input = parseMemoryFromString('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')

      let output = null
      runConfiguration(input, [
        4, 3, 2, 1, 0
      ], val => output = val)
      assert.equal(output, 43210)

      const maxVal = part1('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')
      assert.equal(maxVal, 43210)
    })

    it('Test case 2', function() {
      const input = parseMemoryFromString('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0')

      let output = null
      runConfiguration(input, [
        0, 1, 2, 3, 4
      ], val => output = val)
      assert.equal(output, 54321)

      const maxVal = part1('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0')
      assert.equal(maxVal, 54321)
    })

    it('Test case 3', function() {
      const input = parseMemoryFromString('3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0')

      let output = null
      runConfiguration(input, [
        1, 0, 4, 3, 2
      ], val => output = val)
      assert.equal(output, 65210)

      const maxVal = part1('3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0')
      assert.equal(maxVal, 65210)
    })
  })

  describe('Part 2', function() {
    it('Test case 0', function(done) {
      const input = parseMemoryFromString('3,0,4,0,99')

      const oneInput = []

      intcode(input, oneInput, val => {
        assert.equal(val, 50)
        done()
      })

      setTimeout(function() {
        oneInput.push(50)
      }, 0)
    })

    it('Test case 1', function(done) {
      const input = parseMemoryFromString('3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5')

      runConfiguration2(input, [
        9, 8, 7, 6, 5
      ], val => {
        assert.equal(val, 139629729)
        done()
      })

    })

    it('Test case 1.1', function(done) {
      part2('3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5', val => {
        assert.equal(val, 139629729)
        done()
      })
    })

    it('Test case 2', function(done) {
      const input = parseMemoryFromString('3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10')

      runConfiguration2(input, [
        9, 7, 8, 5, 6
      ], val => {
        assert.equal(val, 18216)
        done()
      })
    })

    it('Test case 2.1', function(done) {
      part2('3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10', val => {
        assert.equal(val, 18216)
        done()
      })
    })
  })
})
