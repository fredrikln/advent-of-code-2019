let { intcode, parseMemoryFromString } = require('../utils/intcode');

module.exports = (input, target = 19690720) => {
  const program = parseMemoryFromString(input);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      try {
        let memory = intcode(program)(noun, verb);

        if (memory[0] === target) {
          return memory;
        }
      } catch (e) {
        continue;
      }
    }
  }
}
