const {
  parseOpCode,
  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUAL,
  HALT,
  MODE_IMMEDIATE,
  MODE_POSITION,
  printHeaders
} = require('./intcode-utils')

const opcodes = {
  [ADD]: 'ADD',
  [MULTIPLY]: 'MUL',
  [INPUT]: 'INP',
  [OUTPUT]: 'OUT',
  [JUMP_IF_TRUE]: 'JTR',
  [JUMP_IF_FALSE]: 'JFL',
  [LESS_THAN]: 'LT',
  [EQUAL]: 'EQ',
  [HALT]: 'HLT',
}

const comments = {
  [ADD]: 'C = A + B',
  [MULTIPLY]: 'C = A * B',
  [INPUT]: 'A = <input>',
  [OUTPUT]: 'output A',
  [JUMP_IF_TRUE]: 'A != 0 -> jump to B',
  [JUMP_IF_FALSE]: 'A == 0 -> jump to B',
  [LESS_THAN]: 'C = (A < B) ? 1 : 0',
  [EQUAL]: 'C = (A == B) ? 1 : 0',
  [HALT]: 'halt program',
}

const modes = {
  [MODE_POSITION]: '$',
  [MODE_IMMEDIATE]: ' ',
}

const debugLogger = (pointer, ...values) => {
  values = values.concat(Array(4 - values.length).fill(''))

  const comment = comments[parseInt(values[0].toString().slice(-2), 10)] || 'raw value'

  const modeLookup = values[0].toString().slice(0, -2).padStart(4, '0').split('').reverse().join('')
  values[0] = opcodes[parseInt(values[0].toString().slice(-2), 10)] || values[0]
  values = values.map((v, i) => {
    let modeSymbol = modes[modeLookup[i-1]] || ' '
    const value = v.toString()

    if (value === '') modeSymbol = ''

    return (modeSymbol + value).padStart(7, ' ')
  })

  console.log(
    pointer.toString().padStart(4, ' '),
    ...values,
    '   ; ' + comment
  )
}

const printProgram = program => {
  let pointer = 0

  printHeaders()

  while (pointer < program.length) {
    const rawInstruction = program[pointer]

    switch (parseOpCode(rawInstruction)) {
      case ADD:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        pointer += 4
        break

      case MULTIPLY:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        pointer += 4
        break

      case INPUT:
        debugLogger(pointer, program[pointer], program[pointer+1])
        pointer += 2
        break

      case OUTPUT:
        debugLogger(pointer, program[pointer], program[pointer+1])
        pointer += 2
        break

      case JUMP_IF_TRUE:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2])
        pointer += 3
        break

      case JUMP_IF_FALSE:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2])
        pointer += 3
        break

      case LESS_THAN:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        pointer += 4
        break

      case EQUAL:
        debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        pointer += 4
        break

      case HALT:
        debugLogger(pointer, program[pointer])
        pointer += 1
        break

      default:
        debugLogger(pointer, program[pointer])
        pointer += 1
        break
    }
  }
}

module.exports = {
  debugLogger,
  printProgram
}
