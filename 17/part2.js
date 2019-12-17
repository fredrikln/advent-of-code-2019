const Intcode = require('../utils/intcode2')
const { parseMemoryFromString } = require('../utils/intcode')

const { parseMap } = require('./part1')

const unblock = () => new Promise(setImmediate) // eslint-disable-line no-undef
const sleep = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms))

const parseInstructions = instructions => instructions.split('').map(c => c.charCodeAt(0))

/* istanbul ignore next */
const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const computerInput = []
  const computerOutput = []

  const memory = parseMemoryFromString(input)
  memory[0] = 2

  let running = true

  const computer = new Intcode({ memory })
  computer.addInput(computerInput)
  computer.addOutput(val => computerOutput.push(val))
  computer.addHaltCallback(() => running = false)
  computer.run()

  const drawStep = false

  const main = parseInstructions('A,A,B,C,A,C,A,B,C,B\n')
  const a = parseInstructions('R,12,L,8,R,6\n')
  const b = parseInstructions('R,12,L,6,R,6,R,8,R,6\n')
  const c = parseInstructions('L,8,R,8,R,6,R,12\n')
  const camera = parseInstructions(`${drawStep ? 'y' : 'n'}\n`)


  let pauseCount = 0
  let lastData

  let out = ''

  const run = async () => {
    if (computerOutput.length === 0) {
      return
    }

    switch (pauseCount) {
      case 0:
        main.forEach(c => computerInput.push(c))
        break

      case 1:
        a.forEach(c => computerInput.push(c))
        break

      case 2:
        b.forEach(c => computerInput.push(c))
        break

      case 3:
        c.forEach(c => computerInput.push(c))
        break

      case 4:
        camera.forEach(c => computerInput.push(c))
        break

      default:
        lastData = computerOutput.splice(0, computerOutput.indexOf(10) + 1)
        if (lastData.length === 1) {
          console.log(out)
          out = ''
          await sleep(10)
        } else {
          out += lastData.map(c => String.fromCharCode(c)).join('')
        }

        if (computerOutput.length === 1) {
          console.log('Part 2:', computerOutput[0])
          return
        }
    }

    pauseCount++
    await unblock()
    run()
  }

  run()
}

// A R12,L8,R6
// B R12,L6,R6,R8,R6
// C L8,R8,R6,R12

// A,A,B,C,A,C,A,B,C,B
