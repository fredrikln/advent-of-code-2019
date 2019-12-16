const part1 = require('./part1')

// const

const part2 = module.exports = input => { // eslint-disable-line no-unused-vars
  const start = parseInt(input.substring(0, 7), 10)

  const signal = Array.from({ length: 10000 }, () => input).join('')
  const message = part1(signal, 100, start)

  return message
}
