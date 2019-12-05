const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const {
  intcode, parseOpCode, getMode, getValue, parseMemoryFromString
} = require('../utils/intcode')

describe('Day 5', function() {
  describe('Part 1', function() {
    it('3,0,4,0,99', function() {
      // assert.equal()
    })

    it('parseOpCode', function() {
      assert.equal(parseOpCode(2), 2)
      assert.equal(parseOpCode(1002), 2)
      assert.equal(parseOpCode(11102), 2)
      assert.equal(parseOpCode(11112), 12)
    })

    it('getMode', function() {
      assert.equal(getMode(1002, 0), 0)
      assert.equal(getMode(1002, 1), 1)
      assert.equal(getMode(1002, 2), 0)

      assert.equal(getMode(11112, 0), 1)
      assert.equal(getMode(11112, 1), 1)
      assert.equal(getMode(11112, 2), 1)

      assert.equal(getMode(1, 0), 0)
      assert.equal(getMode(1, 1), 0)
      assert.equal(getMode(1, 2), 0)

      assert.equal(getMode(2, 0), 0)
      assert.equal(getMode(2, 1), 0)
      assert.equal(getMode(2, 2), 0)
    })

    it('getValue', function() {
      assert.equal(getValue([
        1002, 4, 3, 4
      ], 1, 0), 4)
      assert.equal(getValue([
        1002, 4, 3, 4
      ], 2, 0), 3)

      assert.equal(getValue([
        1002, 4, 3, 4
      ], 1, 1), 1)

      assert.equal(getValue([
        1002, 4, 3, 4
      ], 50, 1), 50)
    })

    it('1002,4,3,4,33', function() {
      const input = parseMemoryFromString('1002,4,3,4,33')
      const output = intcode(input)

      assert.equal(output.toString(), '1002,4,3,4,99')
    })

    it('1101,100,-1,4,0', function() {
      const input = parseMemoryFromString('1101,100,-1,4,0')
      const output = intcode(input)

      assert.equal(output.toString(), '1101,100,-1,4,99')
    })

    it('3,0,4,0,99', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,0,4,0,99')
      const output = intcode(input, 50, callback)

      assert.equal(output.toString(), '50,0,4,0,99')
      assert.equal(callbackValue, 50)
    })
  })

  describe('Part 2', function() {
    it('3,9,8,9,10,9,4,9,99,-1,8', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,9,8,9,10,9,4,9,99,-1,8')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 0)

      intcode(input, 8, callback)
      assert.equal(callbackValue, 1)
    })

    it('3,9,7,9,10,9,4,9,99,-1,8', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,9,7,9,10,9,4,9,99,-1,8')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 1)

      intcode(input, 8, callback)
      assert.equal(callbackValue, 0)
    })

    it('3,3,1108,-1,8,3,4,3,99', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,3,1108,-1,8,3,4,3,99')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 0)

      intcode(input, 8, callback)
      assert.equal(callbackValue, 1)
    })

    it('3,3,1107,-1,8,3,4,3,99', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,3,1107,-1,8,3,4,3,99')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 1)

      intcode(input, 8, callback)
      assert.equal(callbackValue, 0)
    })

    it('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 1)

      intcode(input, 0, callback)
      assert.equal(callbackValue, 0)
    })

    it('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 1)

      intcode(input, 0, callback)
      assert.equal(callbackValue, 0)
    })


    it('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', function() {
      let callbackValue
      const callback = val => callbackValue = val

      const input = parseMemoryFromString('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
      intcode(input, 1, callback)
      assert.equal(callbackValue, 999)

      intcode(input, 8, callback)
      assert.equal(callbackValue, 1000)

      intcode(input, 18, callback)
      assert.equal(callbackValue, 1001)
    })
  })
})
