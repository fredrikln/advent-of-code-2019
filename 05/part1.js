const Intcode = require('../utils/intcode2')

module.exports = (data, input, callback) => {
  const computer = new Intcode({ memory: data })
  computer.addInput([input])
  computer.addOutput(callback)
  computer.run()

  return Object.values(computer.dumpMemory())
}
