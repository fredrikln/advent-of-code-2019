const { readInput } = require('../utils');

const input = readInput('./input.txt');

const part1 = require('./part1');
const part2 = require('./part2');

console.log('Part 1:', part1(input));

console.log('Part 2:', part2(input));
