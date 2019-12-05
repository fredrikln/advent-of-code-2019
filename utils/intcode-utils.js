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

const parseOpCode = instruction => parseInt(instruction.toString().slice(-2), 10)

const getMode = (instruction, param) => parseInt(instruction.toString().slice(0, -2).padStart(param + 1, '0').split('').reverse().join('')[param], 10)

const getValue = (program, addressOrValue, mode = MODE_POSITION) => (mode === MODE_IMMEDIATE ? addressOrValue : program[addressOrValue])

const parseMemoryFromString = data => data.split(',').map(i => parseInt(i, 10))

const printHeaders = () => {
  console.log('ADDR', '  INSTR', '      A', '      B', '      C')
  console.log('----', '-------', '-------', '-------', '-------')
}

module.exports = {
  parseOpCode,
  getMode,
  getValue,
  parseMemoryFromString,
  printHeaders,
  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUAL,
  HALT,
  MODE_POSITION,
  MODE_IMMEDIATE,
}