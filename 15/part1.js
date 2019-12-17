const Intcode = require('../utils/intcode2')

const up = 1
const down = 2
const left = 3
const right = 4

const wall = 0
const empty = 1
const oxygen = 2

const unblock = () => new Promise(setImmediate) // eslint-disable-line no-undef
const sleep = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms))

let position = [0, 0]
const bestSteps = { '0,0': 0 }
const grid = {}
let currentDirection = up

const turnRight = () => {
  if (currentDirection === up) currentDirection = right
  else if (currentDirection === right) currentDirection = down
  else if (currentDirection === down) currentDirection = left
  else if (currentDirection === left) currentDirection = up
}

const turnLeft = () => {
  if (currentDirection === up) currentDirection = left
  else if (currentDirection === right) currentDirection = up
  else if (currentDirection === down) currentDirection = right
  else if (currentDirection === left) currentDirection = down
}

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
        if (x === position[0] && y === position[1]) out += 'RR'
        else if (x === 0 && y === 0) out += 'SS'
        else out += ''.padStart(2, grid[[x, y]])
      } else {
        if (x === 0 && y === 0) out += 'SS'
        else out += '  '
      }
    }

    out += '\n'
  }

  console.log(out)
  // console.log(position, bestSteps[position] || 0)
}

const computerInput = []
const computerOutput = []

let goal = [0, 0]

/* istanbul ignore next */
const part1 = module.exports = (input, callback, animate) => { // eslint-disable-line no-unused-vars
  const computer = new Intcode({ memory: input })
  computer.addInput(computerInput)
  computer.addOutput(val => computerOutput.push(val))
  computer.run()

  const runRobot = async () => {
    // const r = reader.question('Direction? (w,a,s,d): ')

    // if (directions[r]) {
    computerInput.push(currentDirection)

    await unblock()

    const response = computerOutput.splice(0, 1)[0]

    let newPosition

    switch (currentDirection) {
      case up:
        newPosition = [position[0], position[1] - 1]
        break
      case left:
        newPosition = [position[0] - 1, position[1]]
        break
      case down:
        newPosition = [position[0], position[1] + 1]
        break
      case right:
        newPosition = [position[0] + 1, position[1]]
        break
    }

    switch (response) {
      case wall:
        grid[newPosition] = '#'
        turnRight()
        break

      case empty:
        grid[newPosition] = '.'
        if (!bestSteps[newPosition] || bestSteps[newPosition] > bestSteps[position] + 1) {
          bestSteps[newPosition] = bestSteps[position] + 1
        }
        position = newPosition
        turnLeft()
        break

      case oxygen:
        grid[newPosition] = '@'
        if (!bestSteps[newPosition] || bestSteps[newPosition] > bestSteps[position] + 1) {
          bestSteps[newPosition] = bestSteps[position] + 1
        }
        position = newPosition
        // computer.running = false
        goal = position
        // console.log('Goal reached')
        // console.log('start', start, 'goal', goal)
        // return position
        break
    }
    // }

    if (newPosition[0] === 0 && newPosition[1] === 0) {
      // Back to the start, we should have a full map
      computer.running = false
      // console.log('Goal reached')
      // console.log('start', start, 'goal', goal, 'best steps', bestSteps[goal])

      callback(grid, goal, bestSteps)

      return
    }

    if (animate) {
      drawGrid(grid)
      await sleep(10)
    }

    runRobot()
  }

  runRobot()
}

part1.drawGrid = drawGrid
