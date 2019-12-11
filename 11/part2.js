const Intcode = require('../utils/intcode2')

const Robot = require('./robot')

/* istanbul ignore next */
const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const computerInput = []
  const robotInput = []

  const robot = new Robot({
    input: robotInput,
    output: val => computerInput.push(val),
    haltedCallback: () => {
      console.log('Halted part 2:', robot.numPaintedSquares())
    },
    print: true
  })
  robot.grid['0,0'] = 1
  robot.run()

  const computer = new Intcode({ memory: input })
  computer.addInput(computerInput)
  computer.addOutput(val => robotInput.push(val))
  computer.addHaltCallback(() => {
    robot.halted = true
  })
  computer.run()
}
