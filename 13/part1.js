const Intcode = require('../utils/intcode2')

const tiles = {
  0: ' ',
  1: '█',
  2: '░',
  3: '▒',
  4: 'O',
}

/* istanbul ignore next */
const drawGrid = grid => {
  const minMax = Object.keys(grid).reduce((acc, next) => {
    next = next.split(',')
    const x = parseInt(next[0], 10)
    const y = parseInt(next[1], 10)

    if (x < acc[0]) acc[0] = x
    if (x > acc[1]) acc[1] = x
    if (y < acc[2]) acc[2] = y
    if (y > acc[3]) acc[3] = y

    return acc
  }, [
    // minX, maxX, minY, maxY
    9999, -9999, 9999, -9999
  ])

  console.clear()

  let out = ''

  for (let y = minMax[2]; y <= minMax[3]; y++) {
    for (let x = minMax[0]; x <= minMax[1]; x++) {
      if (grid[[x, y]] !== undefined) {
        out += tiles[grid[[x, y]]]
      } else out += ' '
    }

    out += '\n'
  }

  console.log(out)
}

class Cabinet {
  constructor({
    input = [],
    output = [],
    haltedCallback = (() => {}),
    print = false,
    speed = 0
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
    this.speed = speed

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
      if (this.input.length !== 0) {
        setTimeout(() => this.run(), 0)
      } else {
        setTimeout(() => this.run(), this.speed)
      }
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

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const cabinetInput = []

  const cabinet = new Cabinet({
    input: cabinetInput,
    haltedCallback: () => {
      drawGrid(cabinet.grid)
      console.log('Part 1:', Object.values(cabinet.grid).filter(v => v === 2).length)
    }
  })

  const computer = new Intcode({ memory: input })
  computer.addOutput(val => cabinetInput.push(val))
  computer.addHaltCallback(() => {
    cabinet.run()
    cabinet.halted = true
  })
  computer.run()
}

part1.drawGrid = drawGrid
part1.Cabinet = Cabinet
