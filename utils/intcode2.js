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

const defaultConfig = {
  memory: [
    3, 0, 4, 0, 99
  ],
  inputQueues: [],
  outputCallbacks: [],
  haltCallbacks: [],
  debug: false
}

module.exports = class Intcode {
  constructor(config) {
    config = Object.assign({}, defaultConfig, config)

    this.memory = ((typeof config.memory === 'string') ? parseMemoryFromString(config.memory) : config.memory).slice()
    this.inputQueues = config.inputQueues.slice()
    this.outputCallbacks = config.outputCallbacks.slice()
    this.haltCallbacks = config.haltCallbacks.slice()
    this.debug = config.debug

    this.halted = false
    this.waitingForInput = false

    this.pointer = 0
  }

  loadmemory(mem) {
    this.memory = ((typeof mem === 'string') ? parseMemoryFromString(mem) : mem).slice()
  }

  addInput(input) {
    if (input instanceof Intcode) {
      const queue = []
      input.addOutput(val => queue.push(val))
      this.inputQueues.push(queue)
    } else if (Array.isArray(input)) {
      this.inputQueues.push(input)
    } else {
      throw new Error(`Invalid input: ${input} (${typeof input})`)
    }
  }

  addOutput(output) {
    if (output instanceof Intcode) {
      throw new Error('Please use B.addInput(A) instead.')
    } else if (typeof output === 'function') {
      this.outputCallbacks.push(output)
    } else {
      throw new Error(`Invalid output: ${output} (${typeof output})`)
    }
  }

  run() {
    while (!this.halted && !this.waitingForInput) {
      this.step()
    }

    if (this.waitingForInput) {
      setTimeout(() => {
        this.waitingForInput = false
        this.run()
      }, 0)
    }

    if (this.halted) {
      this.haltCallbacks.forEach(callback => callback(this.memory))
      return this.memory
    }
  }

  step() {
    const rawInstruction = this.memory[this.pointer]

    const a = getValue(this.memory, this.memory[this.pointer+1], getMode(rawInstruction, 0))
    const b = getValue(this.memory, this.memory[this.pointer+2], getMode(rawInstruction, 1))

    let allQueuesEmpty = true
    let value = null

    switch (parseOpCode(rawInstruction)) {
      case ADD:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.memory[this.memory[this.pointer+3]] = a + b
        this.pointer += 4
        break

      case MULTIPLY:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.memory[this.memory[this.pointer+3]] = a * b
        this.pointer += 4
        break

      case INPUT:
        for (const queue of this.inputQueues) {
          if (queue.length === 0) continue
          allQueuesEmpty = false
          value = queue.shift()
          break
        }

        if (allQueuesEmpty) {
          this.waitingForInput = true
          break
        }

        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1])

        this.memory[this.memory[this.pointer+1]] = value

        this.pointer += 2
        break

      case OUTPUT:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1])

        this.outputCallbacks.forEach(callback => callback(a))

        this.pointer += 2
        break

      case JUMP_IF_TRUE:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2])
        this.pointer = a !== 0 ? b : this.pointer+3
        break

      case JUMP_IF_FALSE:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2])
        this.pointer = a === 0 ? b : this.pointer+3
        break

      case LESS_THAN:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.memory[this.memory[this.pointer+3]] = a < b ? 1 : 0
        this.pointer += 4
        break

      case EQUAL:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.memory[this.memory[this.pointer+3]] = a === b ? 1 : 0
        this.pointer += 4
        break

      case HALT:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer])
        this.halted = true
        break

      default:
        throw new Error(`Unknown opcode at position ${this.pointer}: ${rawInstruction} (${this.memory.toString()})`)
    }
  }
}
