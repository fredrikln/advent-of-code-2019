const MAX_PARAMETERS = 3

const MODE_POSITION = 0
const MODE_IMMEDIATE = 1

const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_IF_TRUE = 5
const JUMP_IF_FALSE = 6
const LESS_THAN = 7
const EQUAL = 8
const HALT = 99

const numParams = {
  [ADD]: 3,
  [MULTIPLY]: 3,
  [INPUT]: 1,
  [OUTPUT]: 1,
  [JUMP_IF_TRUE]: 2,
  [JUMP_IF_FALSE]: 2,
  [LESS_THAN]: 3,
  [EQUAL]: 3,
  [HALT]: 0,
}

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
  MAX_PARAMETERS,
  opcodes,
  modes,
  comments,
  numParams
}
