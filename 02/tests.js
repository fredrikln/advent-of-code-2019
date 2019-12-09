const { assert } = require('chai')

const { parseMemoryFromString } = require('../utils/intcode')
const Intcode = require('../utils/intcode2')

describe('Day 2', function() {
  describe('Part 1', function() {
    it('parses memory from string', function() {
      const memory = parseMemoryFromString('1,0,0,0,99')

      assert.deepEqual(memory, [
        1, 0, 0, 0, 99
      ])
    })

    it('1,0,0,0,99', function() {
      const computer = new Intcode({ memory: '1,0,0,0,99' })
      computer.run()
      const output = Object.values(computer.dumpMemory())

      assert.equal(output.toString(), '2,0,0,0,99')
      assert.equal(output[0], 2)
    })

    it('2,3,0,3,99', function() {
      const computer = new Intcode({ memory: '2,3,0,3,99' })
      computer.run()
      const output = Object.values(computer.dumpMemory())

      assert.equal(output.toString(), '2,3,0,6,99')
      assert.equal(output[0], 2)
    })

    it('2,4,4,5,99,0', function() {
      const computer = new Intcode({ memory: '2,4,4,5,99,0' })
      computer.run()
      const output = Object.values(computer.dumpMemory())

      assert.equal(output.toString(), '2,4,4,5,99,9801')
      assert.equal(output[0], 2)
    })

    it('1,1,1,4,99,5,6,0,99', function() {
      const computer = new Intcode({ memory: '1,1,1,4,99,5,6,0,99' })
      computer.run()
      const output = Object.values(computer.dumpMemory())

      assert.equal(output.toString(), '30,1,1,4,2,5,6,0,99')
      assert.equal(output[0], 30)
    })
  })
})
