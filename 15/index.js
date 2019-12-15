const { readInput } = require('../utils')

const input = readInput('./input.txt')[0]

const part1 = require('./part1')
const part2 = require('./part2')

part1(input, (grid, goal, bestSteps) => {
  part1.drawGrid(grid)
  console.log(`Start at [0,0], Goal at [${goal}], best steps: ${bestSteps[goal]}`)

  const minutesToOxygenize = part2(grid, goal)

  console.log(`Number of minutes to fill ship with oxygen: ${minutesToOxygenize}`)
}, true)

// console.log('Part 2:', part2(input))
