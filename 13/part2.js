const { Cabinet } = require('./part1')
const Intcode = require('../utils/intcode2')
const { parseMemoryFromString } = require('../utils/intcode')

/* istanbul ignore next */
const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const cabinetInput = []
  const cabinetOutput = []

  const memory = parseMemoryFromString(input)
  memory[0] = 2

  const cabinet = new Cabinet({
    input: cabinetInput,
    output: cabinetOutput,
    haltedCallback: () => {
      console.log('Part 2:', cabinet.points)
    },
    print: true,
    speed: 5
  })

  const computer = new Intcode({ memory })
  computer.addOutput(val => cabinetInput.push(val))
  computer.addInput(cabinetOutput)
  computer.addHaltCallback(() => { cabinet.halted = true })
  computer.run()

  cabinet.run()
}
