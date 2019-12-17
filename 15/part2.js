const up = [0, -1]
const right = [1, 0]
const down = [0, 1]
const left = [-1, 0]

let direction = up

const turnLeft = () => {
  if (direction === up) direction = left
  else if (direction === left) direction = down
  else if (direction === down) direction = right
  else if (direction === right) direction = up
}

const turnRight = () => {
  if (direction === up) direction = right
  else if (direction === left) direction = up
  else if (direction === down) direction = left
  else if (direction === right) direction = down
}

/* istanbul ignore next */
const part2 = module.exports = (grid, goal) => { // eslint-disable-line no-unused-vars
  const findPathLength = (start, end) => {
    let position = start
    const pathLength = { [start]: 0 }

    do {
      const newPosition = [position[0] + direction[0], position[1] + direction[1]]
      if (grid[newPosition] == '#') {
        turnRight()
      } else if (grid[newPosition] == '.') {
        if (!pathLength[newPosition] || pathLength[newPosition] > pathLength[position] + 1) {
          pathLength[newPosition] = pathLength[position] + 1
        }
        position = newPosition
        turnLeft()
      }
    } while (!(position[0] === end[0] && position[1] === end[1]))

    return parseInt(pathLength[end], 10)
  }

  const distances = Object.keys(grid).filter(k => grid[k] === '.').map(k => {
    const coords = k.split(',').map(k => parseInt(k, 10))
    const pathLength = findPathLength(goal, coords)
    return pathLength
  }).sort((a, b) => (a < b ? 1 : -1))

  return distances[0]
}
