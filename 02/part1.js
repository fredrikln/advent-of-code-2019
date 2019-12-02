let { intcode, parseMemoryFromString } = require('../utils/intcode');

module.exports = (data, noun = 12, verb = 2) => {
  const memory = parseMemoryFromString(data);
  memory[1] = noun;
  memory[2] = verb;

  return intcode(memory);
}
