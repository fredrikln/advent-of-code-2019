const { calculateOre } = require('./part1')

const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const trillion = 1000000000000

  // Start at full numer
  let stepSize = trillion

  // Current step
  let i = 0

  // Repeat until we hit stepsize 1
  do {
    let result

    // if we're below 1 trillion ores needed, take another step of (stepSize)
    do {
      // Take a step of (stepsize)
      i += stepSize

      // Print current step
      // console.log(i)

      // calculate ore requirements for (i) batches of fuel
      result = calculateOre(input, 'FUEL', i)
    } while (result < trillion)

    // We're above a trillion, take a step back
    i -= stepSize

    // Make step 1/10th the size
    stepSize = stepSize / 10
  } while (stepSize >= 1)

  return i
}
