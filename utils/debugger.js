const {
  opcodes,
  modes,
  comments,

  parseOpCode,
  printHeaders,
  parseMemoryFromString,

  MAX_PARAMETERS,

  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUAL,
  ADJUST_RELATIVE_BASE,
  HALT
} = require('./intcode-utils')

const debugLogger = (pointer, ...values) => {
  values = values.concat(Array(MAX_PARAMETERS + 1 - values.length).fill(''))

  const instruction = values.shift()
  const opcode = parseInt(instruction.toString().slice(-2), 10)
  const opcodeOrValue = opcodes[opcode] || instruction
  const comment = comments[opcode] || 'raw value'
  const modeLookup = instruction.toString().slice(0, -2).padStart(4, '0').split('').reverse().join('')

  values = values.map((v, i) => {
    let modeSymbol = modes[modeLookup[i]] || ' '
    const value = v.toString()

    if (value === '') modeSymbol = ''

    return (modeSymbol + value).padStart(7, ' ')
  })

  console.log(
    pointer.toString().padStart(4, ' '),
    opcodeOrValue.toString().padStart(7, ' '),
    ...values,
    '   ; ' + comment
  )
}

const printProgram = program => {
  let pointer = 0

  if (typeof program === 'string') {
    program = parseMemoryFromString(program)
  }

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

      case ADJUST_RELATIVE_BASE:
        debugLogger(pointer, program[pointer], program[pointer+1])
        pointer += 2
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
