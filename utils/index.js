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

// https://gist.github.com/egardner/efd34f270cc33db67c0246e837689cb9
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  } else if (isObject(obj1) && isObject(obj2)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) { return false }
    for (var prop in obj1) {
      if (!deepEqual(obj1[prop], obj2[prop])) {
        return false
      }
    }
    return true
  }

  // Private
  function isObject(obj) {
    if (typeof obj === 'object' && obj != null) {
      return true
    } else {
      return false
    }
  }
}

module.exports = {
  deepEqual,
  readInput,
  gcd,
  lcm
}
