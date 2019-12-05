const { intcode, parseMemoryFromString } = require('../utils/intcode')

module.exports = (data, input, callback) => {
  const memory = parseMemoryFromString(data)

  return intcode(memory, input, callback)
}
