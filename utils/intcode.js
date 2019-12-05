const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_IF_TRUE = 5
const JUMP_IF_FALSE = 6
const LESS_THAN = 7
const EQUAL = 8
const HALT = 99

const MODE_POSITION = 0
const MODE_IMMEDIATE = 1

module.exports.parseOpCode = instruction => parseInt(instruction.toString().slice(-2), 10)

module.exports.getMode = (instruction, param) => parseInt(instruction.toString().slice(0, -2).padStart(param + 1, '0').split('').reverse().join('')[param], 10)

module.exports.getValue = (program, addressOrValue, mode = MODE_POSITION) => {
  if (mode === MODE_IMMEDIATE) return addressOrValue

  return program[addressOrValue]
}

module.exports.intcode = (memory, input, outputCallback = console.log) => {
  // Create a copy of the memory as the current program
  const program = memory.slice(0)

  // Start pointer at 0
  let pointer = 0

  while (pointer < program.length) {
    const rawInstruction = program[pointer]
    const instruction = this.parseOpCode(rawInstruction)

    const a = this.getValue(program, program[pointer+1], this.getMode(rawInstruction, 0))
    const b = this.getValue(program, program[pointer+2], this.getMode(rawInstruction, 1))

    switch (instruction) {
      case ADD:
        program[program[pointer+3]] = a + b
        pointer += 4
        break

      case MULTIPLY:
        program[program[pointer+3]] = a * b
        pointer += 4
        break

      case INPUT:
        program[program[pointer+1]] = input
        pointer += 2
        break

      case OUTPUT:
        outputCallback(a)
        pointer += 2
        break

      case JUMP_IF_TRUE:
        pointer = a !== 0 ? b : pointer+3
        break

      case JUMP_IF_FALSE:
        pointer = a === 0 ? b : pointer+3
        break

      case LESS_THAN:
        program[program[pointer+3]] = a < b ? 1 : 0
        pointer += 4
        break

      case EQUAL:
        program[program[pointer+3]] = a === b ? 1 : 0
        pointer += 4
        break

      case HALT:
        return program

      default:
        throw new Error(`Unknown opcode at position ${pointer}: ${instruction} (${program.toString()})`)
    }
  }
}

module.exports.parseMemoryFromString = data => data.split(',').map(i => parseInt(i, 10))
