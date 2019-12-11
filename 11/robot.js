const up = [0, -1]
const left = [-1, 0]
const down = [0, 1]
const right = [1, 0]


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
      if (grid[`${x},${y}`] !== undefined) {
        out += grid[`${x},${y}`] === 1 ? '#' : ' '
      } else out += ' '
    }
    out += '\n'
  }

  console.log(out)
}

class Robot {
  constructor({
    input = [],
    output = [],
    haltedCallback = (() => {}),
    print = false
  }) {
    this.input = input
    this.output = output
    this.haltedCallback = haltedCallback
    this.direction = up
    this.x = 0
    this.y = 0
    this.waitingForInput = false
    this.grid = {}
    this.halted = false
    this.print = print
  }

  getPanel(x, y) {
    return this.grid[`${x},${y}`] || 0
  }

  paintPanel(x, y, color) {
    this.grid[`${x},${y}`] = color
  }

  turnLeft() {
    if (this.direction === up) this.direction = left
    else if (this.direction === left) this.direction = down
    else if (this.direction === down) this.direction = right
    else if (this.direction === right) this.direction = up
  }

  turnRight() {
    if (this.direction === up) this.direction = right
    else if (this.direction === left) this.direction = up
    else if (this.direction === down) this.direction = left
    else if (this.direction === right) this.direction = down
  }

  turn(shouldTurnRight) {
    if (shouldTurnRight) {
      this.turnRight()
    } else {
      this.turnLeft()
    }
  }

  run() {
    if (this.input.length === 0 && !this.waitingForInput) {
      this.waitingForInput = true
      this.output(this.getPanel(this.x, this.y))
    } else if (this.input.length === 2) {
      this.waitingForInput = false

      const color = this.input.shift()
      const turn = this.input.shift()

      this.paintPanel(this.x, this.y, color)
      if (this.print) drawGrid(this.grid)
      this.turn(turn)
      this.x += this.direction[0]
      this.y += this.direction[1]
    }

    if (!this.halted) setTimeout(() => this.run(), 0)
    else {
      this.haltedCallback()
    }
  }

  numPaintedSquares() {
    return Object.keys(this.grid).length
  }
}

module.exports = Robot
