const { drawGrid } = require('./part1')
const Intcode = require('../utils/intcode2')
const { parseMemoryFromString } = require('../utils/intcode')

class Cabinet {
  constructor({
    input = [],
    output = [],
    haltedCallback = (() => {}),
    print = false
  }) {
    this.input = input
    this.output = output
    this.haltedCallback = haltedCallback
    this.x = 0
    this.y = 0
    this.waitingForInput = false
    this.grid = {}
    this.halted = false
    this.print = print

    this.joystick = 0
    this.ballXSpeed = 1
    this.lastBallX = 0

    this.points = 0
  }

  getPanel(x, y) {
    return this.grid[[x, y]] || 0
  }

  drawPixel(x, y, tileId) {
    this.grid[[x, y]] = tileId
  }

  run() {
    if (this.input.length === 0 && !this.waitingForInput) {
      this.waitingForInput = true
      if (this.print) {
        drawGrid(this.grid)
        console.log(this.points)
      }

      const ballKey = Object.keys(this.grid).filter(t => this.grid[t] === 4)[0]
      const paddleKey = Object.keys(this.grid).filter(t => this.grid[t] === 3)[0]

      const ballX = parseInt(ballKey.split(',')[0], 10)
      const paddleX = parseInt(paddleKey.split(',')[0])

      if (paddleX + this.ballXSpeed < ballX + this.ballXSpeed) this.joystick = 1
      else if (paddleX + this.ballXSpeed > ballX + this.ballXSpeed) this.joystick = -1
      else this.joystick = 0

      this.output.push(this.joystick)

      if (this.lastBallX) this.ballXSpeed = ballX - this.lastBallX
      this.lastBallX = ballX
    } else if (this.input.length % 3 === 0) {
      this.waitingForInput = false

      const [
        x, y, tileId
      ] = this.input.splice(0, 3)

      if (x === -1 && y === 0) {
        this.points = tileId
      } else {
        this.drawPixel(x, y, tileId)
      }
    }

    if (!this.halted) {
      setTimeout(() => this.run(), 0)
    } else {
      if (this.input.length !== 0) {
        setTimeout(() => this.run(), 0)
      } else {
        this.haltedCallback()
      }
    }
  }

  numPaintedSquares() {
    return Object.keys(this.grid).length
  }
}

const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const cabinetInput = []
  const cabinetOutput = []

  const memory = parseMemoryFromString(input)
  memory[0] = 2

  const cabinet = new Cabinet({
    input: cabinetInput,
    output: cabinetOutput,
    haltedCallback: () => {
      console.log('Part 2:', cabinet.points)
    },
    print: true
  })

  const computer = new Intcode({ memory })
  computer.addOutput(val => cabinetInput.push(val))
  computer.addInput(cabinetOutput)
  computer.addHaltCallback(() => { cabinet.halted = true })
  computer.run()

  cabinet.run()
}
