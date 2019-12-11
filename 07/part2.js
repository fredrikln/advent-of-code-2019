const { parseMemoryFromString } = require('../utils/intcode')
const Intcode = require('../utils/intcode2')
const { permutator } = require('./part1')

const runConfiguration = (program, phaseSettings, toThrusters = console.log) => {
  let output = 0

  const computer1 = new Intcode({ memory: program })
  computer1.addInput([phaseSettings[0]])
  computer1.addInput([0])

  const computer2 = new Intcode({ memory: program })
  computer2.addInput([phaseSettings[1]])
  computer2.addInput(computer1)

  const computer3 = new Intcode({ memory: program })
  computer3.addInput([phaseSettings[2]])
  computer3.addInput(computer2)

  const computer4 = new Intcode({ memory: program })
  computer4.addInput([phaseSettings[3]])
  computer4.addInput(computer3)

  const computer5 = new Intcode({ memory: program })
  computer5.addInput([phaseSettings[4]])
  computer5.addInput(computer4)
  computer5.addOutput(val => output = val)
  computer5.addHaltCallback(() => toThrusters(output))

  computer1.addInput(computer5)

  computer1.run()
  computer2.run()
  computer3.run()
  computer4.run()
  computer5.run()
}

const part2 = module.exports = (data, callBack = console.log) => { // eslint-disable-line no-unused-vars
  const memory = parseMemoryFromString(data)

  let maxVal = 0

  const phaseSettings = [
    5, 6, 7, 8, 9
  ]

  const permutations = permutator(phaseSettings)
  let completed = 0

  for (const permutation of permutations) {
    runConfiguration(memory, permutation, val => {
      completed++
      if (maxVal < val) maxVal = val
      if (completed === permutations.length) callBack(maxVal)
    })
  }
}

part2.runConfiguration = runConfiguration
