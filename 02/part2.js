let part1 = require('./part1');

module.exports = (data, target = 19690720) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      try {
        let memory = part1(data, noun, verb);

        if (memory[0] === target) {
          return [noun, verb];
        }
      } catch (e) {
        continue;
      }
    }
  }
}
