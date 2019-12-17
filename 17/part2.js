const Intcode = require('../utils/intcode2')
const { parseMemoryFromString } = require('../utils/intcode')

const unblock = () => new Promise(setImmediate) // eslint-disable-line no-undef
const sleep = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms))

const parseInstructions = instructions => instructions.split('').map(c => c.charCodeAt(0))

/* istanbul ignore next */
const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const computerInput = []
  const computerOutput = []

  const memory = parseMemoryFromString(input)
  memory[0] = 2

  const computer = new Intcode({ memory })
  computer.addInput(computerInput)
  computer.addOutput(val => computerOutput.push(val))
  computer.run()

  const drawStep = false

  // My sequence (manually calculated) = R12,L8,R6,R12,L8,R6,R12,L6,R6,R8,R6,L8,R8,R6,R12,R12,L8,R6,L8,R8,R6,R12,R12,L8,R6,R12,L6,R6,R8,R6,L8,R8,R6,R12,R12,L6,R6,R8,R6
  const baseSequence = 'R12,L8,R6,R12,L8,R6,R12,L6,R6,R8,R6,L8,R8,R6,R12,R12,L8,R6,L8,R8,R6,R12,R12,L8,R6,R12,L6,R6,R8,R6,L8,R8,R6,R12,R12,L6,R6,R8,R6'

  const calculateSequences = baseSequence => {
    baseSequence = baseSequence + ','

    for (let i = 0; i < baseSequence.length; i++) {
      const sequence1 = baseSequence.substring(0, i+1)
      const newSequence1 = baseSequence.replace(new RegExp(sequence1, 'g'), '')

      for (let j = 0; j < newSequence1.length; j++) {
        const sequence2 = newSequence1.substring(0, j+1)
        const newSequence2 = newSequence1.replace(new RegExp(sequence2, 'g'), '')

        for (let k = 0; k < newSequence2.length; k++) {
          const sequence3 = newSequence2.substring(0, k+1)
          const rest = newSequence2.replace(new RegExp(sequence3, 'g'), '')

          if (rest.length === 0 && sequence1.length < 20 && sequence2.length < 20 && sequence3.length < 20) {
            return [
              sequence1, sequence2, sequence3
            ]
          }
        }
      }
    }
  }

  let sequences = calculateSequences(baseSequence).map(s => s.substring(0, s.length - 1))

  let mainSequence = baseSequence
  sequences.forEach((sequence, i) => mainSequence = mainSequence.replace(new RegExp(sequence, 'g'), String.fromCharCode(65 + i)))
  sequences = sequences.map(s => s.replace(/([LR])/g, '$1,'))

  const main = parseInstructions(mainSequence + '\n')
  const a = parseInstructions(sequences[0] + '\n')
  const b = parseInstructions(sequences[1] + '\n')
  const c = parseInstructions(sequences[2] + '\n')
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
