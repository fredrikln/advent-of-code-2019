const Intcode = require('../utils/intcode2')

const part2 = module.exports = (input, outputCallback) => { // eslint-disable-line no-unused-vars
  const computer = new Intcode({ memory: input })
  computer.addInput([2])
  computer.addOutput(outputCallback)
  computer.run()
}
