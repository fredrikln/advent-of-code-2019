const { readInput } = require('../utils');

const input = readInput('./input.txt');

const program = input[0];

const part1 = require('./part1');
const output = part1(program, 12, 2);
console.log('Part 1:', output.toString(), output[0]);

console.log();

const part2 = require('./part2');
const output2 = part2(program, 19690720);
console.log('Part2:', output2.toString(), output2[1], output2[2]);
