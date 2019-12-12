const fs = require('fs')

/**
 * Read file and split on rows
 */
const readInput = file => fs.readFileSync(file, 'utf-8')
  .trim()
  .split('\n')


// Looked these up on wikipedia
const gcd = (a, ...b) => {
  if (b.length > 1) {
    return gcd(
      a,
      gcd(
        b[0],
        ...b.slice(1)
      )
    )
  }

  if (Array.isArray(b)) b = b[0]

  if (b > a) [a, b] = [b, a]

  while (b != 0) {
    const t = b
    b = a % b
    a = t
  }

  return a
}

// Looked these up on wikipedia
const lcm = (a, ...b) => {
  if (b.length > 1) {
    return lcm(
      a,
      lcm(
        b[0],
        ...b.slice(1)
      )
    )
  }

  return Math.abs(a * b[0]) / gcd(a, b[0])
}

module.exports = {
  readInput,
  gcd,
  lcm
}
