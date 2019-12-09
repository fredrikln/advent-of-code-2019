const Intcode = require('../utils/intcode2')

const part1 = module.exports = (input, outputCallback) => { // eslint-disable-line no-unused-vars
  const computer = new Intcode({
    debug: false,
    memory: input
  })
  computer.addInput([1])
  computer.addOutput(outputCallback)
  computer.run()
}