const { debugLogger } = require('./debugger')
const {
  parseMemoryFromString,
  parseOpCode,
  getValue,
  getMode,

  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUAL,
  HALT,
} = require('./intcode-utils')

const intcode = (memory, input = null, outputCallback = console.log, debug = false, haltedCallback = () => {}) => {
  const program = memory.slice()

  // Start pointer at 0
  let pointer = 0
  let halted = false
  let waitingForInput = false

  const run = () => {
    while (!halted && !waitingForInput) {
      step()
    }

    if (waitingForInput) {
      setTimeout(() => {
        waitingForInput = false
        run()
      }, 0)
    }

    if (halted) {
      haltedCallback(program)
      return program
    }
  }

  const step = () => {
    const rawInstruction = program[pointer]

    const a = getValue(program, program[pointer+1], getMode(rawInstruction, 0))
    const b = getValue(program, program[pointer+2], getMode(rawInstruction, 1))

    switch (parseOpCode(rawInstruction)) {
      case ADD:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        program[program[pointer+3]] = a + b
        pointer += 4
        break

      case MULTIPLY:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        program[program[pointer+3]] = a * b
        pointer += 4
        break

      case INPUT:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1])

        if (Array.isArray(input)) {
          if (input.length === 0) {
            waitingForInput = true
            break
          }

          program[program[pointer+1]] = input.shift()
        } else {
          program[program[pointer+1]] = input
        }

        pointer += 2
        break

      case OUTPUT:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1])
        outputCallback(a)
        pointer += 2
        break

      case JUMP_IF_TRUE:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2])
        pointer = a !== 0 ? b : pointer+3
        break

      case JUMP_IF_FALSE:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2])
        pointer = a === 0 ? b : pointer+3
        break

      case LESS_THAN:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        program[program[pointer+3]] = a < b ? 1 : 0
        pointer += 4
        break

      case EQUAL:
        if (debug) debugLogger(pointer, program[pointer], program[pointer+1], program[pointer+2], program[pointer+3])
        program[program[pointer+3]] = a === b ? 1 : 0
        pointer += 4
        break

      case HALT:
        if (debug) debugLogger(pointer, program[pointer])
        halted = true
        break

      default:
        throw new Error(`Unknown opcode at position ${pointer}: ${rawInstruction} (${program.toString()})`)
    }
  }

  return run()
}

module.exports = {
  intcode,
  parseMemoryFromString,
  getMode,
  getValue,
  parseOpCode
}
