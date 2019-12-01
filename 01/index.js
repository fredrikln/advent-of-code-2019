const { readInput } = require('../utils');

const input = readInput('./input.txt');

const fuelReq = require('./part1');

let getTotalFuelRequired = (fuelRequiredFunc) => input
  .map(i => parseInt(i, 10))
  .map(fuelRequiredFunc)
  .reduce((acc, next) => acc + next, 0);

console.log('Part 1: ', getTotalFuelRequired(fuelReq))

const fuelReq2 = require('./part2');

console.log('Part 2: ', getTotalFuelRequired(fuelReq2));
