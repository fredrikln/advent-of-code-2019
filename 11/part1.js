const Intcode = require('../utils/intcode2')

const Robot = require('./robot')

/* istanbul ignore next */
const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const computerInput = []
  const robotInput = []

  const robot = new Robot({
    input: robotInput,
    output: val => computerInput.push(val),
    haltedCallback: () => {
      console.log('Halted part 1:', robot.numPaintedSquares())
    },
    print: false
  })
  robot.run()

  const computer = new Intcode({ memory: input })
  computer.addInput(computerInput)
  computer.addOutput(val => robotInput.push(val))
  computer.addHaltCallback(() => {
    robot.halted = true
  })
  computer.run()
}
