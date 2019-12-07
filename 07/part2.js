const { intcode, parseMemoryFromString } = require('../utils/intcode')
const { permutator } = require('./part1')

const runConfiguration = (program, phaseSettings, toThrusters = console.log) => {
  const amp1Input = [phaseSettings[0], 0]
  const amp2Input = [phaseSettings[1]]
  const amp3Input = [phaseSettings[2]]
  const amp4Input = [phaseSettings[3]]
  const amp5Input = [phaseSettings[4]]

  let output

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
    output = amp5Output
    amp1Input.push(amp5Output)
  }, false, () => toThrusters(output))
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
