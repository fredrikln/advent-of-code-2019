const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const Robot = require('./robot')

describe('Day 11', function() {
  describe('Part 1', function() {
    it('Test case 1', function(done) {
      let output = -1
      const robot = new Robot({
        input: [],
        output: val => output = val,
        haltedCallback: () => {
          assert.equal(output, 0)
          assert.equal(robot.numPaintedSquares(), 0)

          done()
        }
      })
      robot.halted = true
      robot.run()
    })

    it('Test case 2', function(done) {
      let output = -1
      const robot = new Robot({
        input: [1, 0],
        output: val => {
          output = val
        },
        haltedCallback: () => {
          assert.equal(output, -1)
          assert.deepEqual(robot.direction, [-1, 0])
          assert.equal(robot.x, -1)
          assert.equal(robot.y, 0)
          assert.equal(robot.waitingForInput, false)
          assert.equal(robot.numPaintedSquares(), 1)

          done()
        }
      })
      robot.halted = true
      robot.run()
    })

    it('Test case 3', function(done) {
      let counter = 4

      const input = []
      const output = []
      const robot = new Robot({
        input: input,
        output: val => {
          output.push(val)
          if (counter > 0) {
            input.push(1)
            input.push(0)
            counter--
          } else {
            robot.halted = true
          }
        },
        haltedCallback: () => {
          // Turn left in a circle and end up on first grid which is now white
          assert.deepEqual(output, [
            0, 0, 0, 0, 1
          ])
          assert.deepEqual(robot.direction, [0, -1])
          assert.equal(robot.x, 0)
          assert.equal(robot.y, 0)
          assert.equal(robot.waitingForInput, true)
          assert.equal(robot.numPaintedSquares(), 4)
          done()
        }
      })
      robot.run()
    })

    it('Test case 3', function(done) {
      let counter = 4

      const input = []
      const output = []
      const robot = new Robot({
        input: input,
        output: val => {
          output.push(val)
          if (counter > 0) {
            input.push(1)
            input.push(1)
            counter--
          } else {
            robot.halted = true
          }
        },
        haltedCallback: () => {
          // Turn right in a circle and end up on first grid which is now white
          assert.deepEqual(output, [
            0, 0, 0, 0, 1
          ])
          assert.deepEqual(robot.direction, [0, -1])
          assert.equal(robot.x, 0)
          assert.equal(robot.y, 0)
          assert.equal(robot.waitingForInput, true)
          assert.equal(robot.numPaintedSquares(), 4)

          done()
        }
      })
      robot.run()
    })
  })
})
