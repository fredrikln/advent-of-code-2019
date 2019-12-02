let { intcode, parseMemoryFromString } = require('../utils/intcode');

module.exports = (input, noun = 12, verb = 2) => {
  const program = parseMemoryFromString(input);

  return intcode(program)(noun, verb);
}
