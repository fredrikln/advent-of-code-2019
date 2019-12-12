const { parseInput, step } = require('./part1')
const { lcm } = require('../utils')

const findCycle = moons => {
  const moonsX = new Set()
  const moonsY = new Set()
  const moonsZ = new Set()

  // Find unique X, Y and Z cycles, brute force style
  // Didn't remember X only affected X until I read some tips on Reddit
  let lastXCount = 0
  let lastYCount = 0
  let lastZCount = 0

  // Step until we've reached all cycles in X, Y and Z
  while (true) { // eslint-disable-line no-constant-condition
    let outX = ''
    let outY = ''
    let outZ = ''

    for (const moon of moons) {
      outX += `${moon.position.x},${moon.velocity.x},`
      outY += `${moon.position.y},${moon.velocity.y},`
      outZ += `${moon.position.z},${moon.velocity.z},`
    }

    moonsX.add(outX)
    moonsY.add(outY)
    moonsZ.add(outZ)

    // No new coordinate/velocity combinations added
    if (moonsX.size === lastXCount && moonsY.size === lastYCount && moonsZ.size === lastZCount) {
      break
    }

    lastXCount = moonsX.size
    lastYCount = moonsY.size
    lastZCount = moonsZ.size

    moons = step(moons)
  }

  // Once I had the unique X Y and Z cycles I had to find out when they meet
  // Also a new concept for me, I saw someone mention least common multiple
  return Math.round(lcm(
    moonsX.size,
    moonsY.size,
    moonsZ.size
  ))
}

const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const moons = parseInput(input)

  return findCycle(moons)
}

part2.findCycle = findCycle
