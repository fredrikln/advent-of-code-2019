const { intcode, parseMemoryFromString } = require('../utils/intcode')

const runConfiguration = (program, phaseSettings, toThrusters = console.log) => {
  const amp1Input = [phaseSettings[0], 0]
  const amp2Input = [phaseSettings[1]]
  const amp3Input = [phaseSettings[2]]
  const amp4Input = [phaseSettings[3]]
  const amp5Input = [phaseSettings[4]]

  intcode(program, amp1Input, amp1Output => {
    amp2Input.push(amp1Output)
  })
  intcode(program, amp2Input, amp2Output => {
    amp3Input.push(amp2Output)
  })
  intcode(program, amp3Input, amp3Output => {
    amp4Input.push(amp3Output)
  })
  intcode(program, amp4Input, amp4Output => {
    amp5Input.push(amp4Output)
  })
  intcode(program, amp5Input, amp5Output => {
    toThrusters(amp5Output)
  })
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
