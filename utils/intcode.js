const ADD = 1;
const MULTIPLY = 2;
const HALT = 99;

module.exports.intcode = (memory) => (noun = null, verb = null) => {
  // Create a copy of the memory as the current program
  const program = memory.slice(0)

  // Load noun and verb if available (not available in Day 2 examples for test)
  if (noun !== null) program[1] = noun;
  if (verb !== null) program[2] = verb;

  // Start pointer at 0
  let pointer = 0;

  while (pointer < program.length) {
    const instruction = program[pointer];
    const a = program[pointer+1];
    const b = program[pointer+2];
    const output = program[pointer+3];

    switch(instruction) {
      case ADD:
        program[output] = program[a] + program[b];
        pointer += 4;
        break;

      case MULTIPLY:
        program[output] = program[a] * program[b];
        pointer += 4;
        break;

      case HALT:
        return program;

      default:
        throw new Error(`Unknown opcode at position ${pointer}: ${instruction}`);
        break;
    }
  }
};

module.exports.parseMemoryFromString = (data) => data.split(',').map(i => parseInt(i, 10));
