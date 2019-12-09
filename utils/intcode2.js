const { debugLogger } = require('./debugger')
const {
  parseMemoryFromString,
  parseOpCode,
  getMode,

  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUAL,
  ADJUST_RELATIVE_BASE,
  HALT,

  MODE_IMMEDIATE,
  MODE_POSITION,
  MODE_RELATIVE
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

    this.loadMemory(config.memory)
    this.inputQueues = config.inputQueues.slice()
    this.outputCallbacks = config.outputCallbacks.slice()
    this.haltCallbacks = config.haltCallbacks.slice()
    this.debug = config.debug

    this.halted = false
    this.waitingForInput = false

    this.pointer = 0
    this.base = 0

    this.numInstructions = 0
  }

  loadMemory(mem) {
    this.memory = {}
    const copy = ((typeof mem === 'string') ? parseMemoryFromString(mem) : mem).slice()
    copy.forEach((v, i) => this.memory[i] = v)
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

  addHaltCallback(callback) {
    this.haltCallbacks.push(callback)
  }

  setMemory(addressOrRelative, mode, value) {
    switch (mode) {
      case MODE_POSITION:
        this.memory[addressOrRelative] = value
        break

      case MODE_RELATIVE:
        this.memory[addressOrRelative + this.base] = value
        break

      default:
        throw new Error(`Unknown mode ${mode}`)
    }
  }

  getMemory(address) {
    return this.memory[address] || 0
  }

  getValue(addressOrValue, mode) {
    switch (mode) {
      case MODE_POSITION:
        return this.getMemory(addressOrValue)

      case MODE_IMMEDIATE:
        return addressOrValue

      case MODE_RELATIVE:
        return this.getMemory(this.base + addressOrValue)
    }
  }

  dumpMemory() {
    return this.memory
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
    const a = this.getValue(this.memory[this.pointer+1], getMode(rawInstruction, 0))
    const b = this.getValue(this.memory[this.pointer+2], getMode(rawInstruction, 1))

    let allQueuesEmpty = true
    let value = null

    this.numInstructions += 1

    switch (parseOpCode(rawInstruction)) {
      case ADD:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.setMemory(this.memory[this.pointer+3], getMode(rawInstruction, 2), a + b)
        this.pointer += 4
        break

      case MULTIPLY:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.setMemory(this.memory[this.pointer+3], getMode(rawInstruction, 2), a * b)
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

        this.setMemory(this.memory[this.pointer+1], getMode(rawInstruction, 0), value)

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
        this.setMemory(this.memory[this.pointer+3], getMode(rawInstruction, 2), a < b ? 1 : 0)
        this.pointer += 4
        break

      case EQUAL:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1], this.memory[this.pointer+2], this.memory[this.pointer+3])
        this.setMemory(this.memory[this.pointer+3], getMode(rawInstruction, 2), a === b ? 1 : 0)
        this.pointer += 4
        break

      case ADJUST_RELATIVE_BASE:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer], this.memory[this.pointer+1])
        this.base = this.base + a
        this.pointer += 2
        break

      case HALT:
        if (this.debug) debugLogger(this.pointer, this.memory[this.pointer])
        if (this.debug) console.log('Total memory used:', Object.keys(this.memory).length)
        if (this.debug) console.log('Instructions called:', this.numInstructions)
        this.halted = true
        break

      default:
        throw new Error(`Unknown opcode at position ${this.pointer}: ${rawInstruction} (${this.memory.toString()})`)
    }
  }
}
