const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const Intcode = require('../utils/intcode2')

describe('Day 9', function() {
  describe('Part 1', function() {
    it('Test case 1', function(done) {
      const out = []

      const computer = new Intcode({
        memory: '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
        debug: false,
        haltCallbacks: [
          () => {
            assert.equal(out.join(','), '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99')
            done()
          }
        ]
      })
      computer.addOutput(val => out.push(val))
      computer.run()
    })

    it('Test case 2', function(done) {
      const out = []

      const computer = new Intcode({
        memory: '1102,34915192,34915192,7,4,7,99,0',
        debug: false,
        haltCallbacks: [
          () => {
            assert.equal(out[0].toString().length, 16)
            done()
          }
        ]
      })
      computer.addOutput(val => out.push(val))
      computer.run()
    })

    it('Test case 3', function(done) {
      const out = []

      const computer = new Intcode({
        memory: '104,1125899906842624,99',
        debug: false,
        haltCallbacks: [
          () => {
            assert.equal(out[0], 1125899906842624)
            done()
          }
        ]
      })
      computer.addOutput(val => out.push(val))
      computer.run()
    })
  })
})
