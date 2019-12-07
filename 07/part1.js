const { parseMemoryFromString } = require('../utils/intcode')
const Intcode = require('../utils/intcode2')

const runConfiguration = (program, phaseSettings, toThrusters = console.log) => {
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

  computer5.addOutput(toThrusters)

  computer1.run()
  computer2.run()
  computer3.run()
  computer4.run()
  computer5.run()
}

const permutator = inputArr => {
  if (inputArr.length === 1) return inputArr

  const result = []
  for (let i = 0; i < inputArr.length; i++) {
    const copy = inputArr.slice() // make copy

    const element = copy.splice(i, 1)

    for (const perm of permutator(copy)) {
      result.push(element.concat(perm))
    }
  }

  return result
}

const part1 = module.exports = data => { // eslint-disable-line no-unused-vars
  const memory = parseMemoryFromString(data)

  let maxVal = 0

  const phaseSettings = [
    0, 1, 2, 3, 4
  ]

  for (const permutation of permutator(phaseSettings)) {
    runConfiguration(memory, permutation, val => {
      if (maxVal < val) maxVal = val
    })
  }

  return maxVal
}

part1.runConfiguration = runConfiguration
part1.permutator = permutator
