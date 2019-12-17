const Intcode = require('../utils/intcode2')

const parseMap = data => {
  const map = data.map(charCode => String.fromCharCode(charCode)).join('').trim().split('\n').map(r => r.split(''))

  return map
}

const getAlignmentParameters = map => {
  let sum = 0

  for (const y in map) {
    const row = map[y]
    for (const x in row) {
      const char = row[x]

      const xCoord = parseInt(x, 10)
      const yCoord = parseInt(y, 10)

      if (char === '#') {
        const up = map[yCoord-1] ? map[yCoord-1][xCoord] : undefined
        const left = map[yCoord][xCoord-1]
        const right = map[yCoord][xCoord+1]
        const down = map[yCoord+1] ? map[yCoord+1][xCoord] : undefined

        if (char == up && up == right && right == down && down == left) {
          sum += xCoord * yCoord
        }
      }
    }
  }

  return sum
}

/* istanbul ignore next */
const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const computerInput = []
  const computerOutput = []

  const computer = new Intcode({ memory: input })
  computer.addInput(computerInput)
  computer.addOutput(val => computerOutput.push(val))
  computer.run()

  const map = parseMap(computerOutput)

  console.log(map.map(r => r.join('')).join('\n'))

  const alignmentParameters = getAlignmentParameters(map)
  return alignmentParameters
}

part1.parseMap = parseMap
