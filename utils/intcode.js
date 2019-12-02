module.exports.intcode = (memory) => (noun = 12, verb = 2) => {
  // Create a copy of the memory as the current program
  const program = memory.slice(0)

  program[1] = noun;
  program[2] = verb;

  for (let i = 0; i < program.length; i += 4) {
    const a = program[i+1];
    const b = program[i+2];
    const output = program[i+3];

    switch(program[i]) {
      case 1:
        program[output] = program[a] + program[b];
        break;
      case 2:
        program[output] = program[a] * program[b];
        break;
      case 99:
        return program;
      default:
        throw new Error(`Unknown opcode at position ${i}: ${program[i]}`);
        break;
    }
  }
};

module.exports.parseMemoryFromString = (data) => data.split(',').map(i => parseInt(i, 10));
