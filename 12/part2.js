const { parseInput, step } = require('./part1')

// Looked these up on wikipedia
const gcd = (a, b) => {
  if (b > a) [a, b] = [b, a]

  while (b != 0) {
    const t = b
    b = a % b
    a = t
  }

  return a
}

// Looked these up on wikipedia
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)

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
  const cycles = [
    moonsX.size, moonsY.size, moonsZ.size
  ]

  // Sorting these because using the larger number caused JavaScripts number to go wonky
  const lcms = [
    lcm(cycles[0], cycles[1]),
    lcm(cycles[1], cycles[2]),
    lcm(cycles[0], cycles[2])
  ].sort((a, b) => (a < b ? -1 : 1))

  return lcm(lcms[1], lcms[0])
}

const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const moons = parseInput(input)

  return findCycle(moons)
}

part2.findCycle = findCycle
