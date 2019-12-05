const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_IF_TRUE = 5
const JUMP_IF_FALSE = 6
const LESS_THAN = 7
const EQUAL = 8
const HALT = 99

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

const MODE_POSITION = 0
const MODE_IMMEDIATE = 1

const modes = {
  [MODE_POSITION]: '$',
  [MODE_IMMEDIATE]: ' ',
}

const debugLogger = (pointer, ...values) => {
  const modeLookup = values[0].toString().slice(0, -2).padStart(4, '0').split('').reverse().join('')
  values[0] = opcodes[parseInt(values[0].toString().slice(-2), 10)]
  console.log(pointer.toString().padStart(4, ' '), ...values.map((v, i) => ((modes[modeLookup[i-1]] || ' ') + v.toString()).padStart(6, ' ')))
}

module.exports.parseOpCode = instruction => parseInt(instruction.toString().slice(-2), 10)

module.exports.getMode = (instruction, param) => parseInt(instruction.toString().slice(0, -2).padStart(param + 1, '0').split('').reverse().join('')[param], 10)

module.exports.getValue = (program, addressOrValue, mode = MODE_POSITION) => (mode === MODE_IMMEDIATE ? addressOrValue : program[addressOrValue])

module.exports.intcode = (memory, input = null, outputCallback = console.log, debug = false) => {
  // Create a copy of the memory as the current program
  const program = memory.slice(0)

  // Start pointer at 0
  let pointer = 0

  while (pointer < program.length) {
    const rawInstruction = program[pointer]

    const a = this.getValue(program, program[pointer+1], this.getMode(rawInstruction, 0))
    const b = this.getValue(program, program[pointer+2], this.getMode(rawInstruction, 1))

    switch (this.parseOpCode(rawInstruction)) {
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
        program[program[pointer+1]] = input
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
        return program

      default:
        throw new Error(`Unknown opcode at position ${pointer}: ${rawInstruction} (${program.toString()})`)
    }
  }
}

module.exports.parseMemoryFromString = data => data.split(',').map(i => parseInt(i, 10))
