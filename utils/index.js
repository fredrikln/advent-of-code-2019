const fs = require('fs')

/**
 * Read file and split on rows
 */
const readInput = file => fs.readFileSync(file, 'utf-8')
  .trim()
  .split('\n')


// Looked these up on wikipedia
const gcd = (...vals) => {
  if (vals.length > 2) {
    return vals.slice(1).reduce((acc, next) => gcd(acc, next), vals[0])
  }

  let [a, b] = vals

  while (b != 0) {
    const t = b
    b = a % b
    a = t
  }

  return a
}

// Looked these up on wikipedia
const lcm = (...vals) => {

  if (vals.length > 2) {
    return vals.slice(1).reduce((acc, next) => lcm(acc, next), vals[0])
  }

  const [a, b] = vals

  return Math.abs(a * b) / gcd(a, b)
}

module.exports = {
  readInput,
  gcd,
  lcm
}
