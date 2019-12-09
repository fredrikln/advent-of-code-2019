const { parseMemoryFromString } = require('../utils/intcode')
const Intcode = require('../utils/intcode2')

module.exports = (data, noun = 12, verb = 2) => {
  const memory = parseMemoryFromString(data)
  memory[1] = noun
  memory[2] = verb

  const computer = new Intcode({ memory })
  computer.run()

  return Object.values(computer.dumpMemory())
}
