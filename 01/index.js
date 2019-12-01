const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const fuelReq = (mass) => Math.max(Math.floor(mass / 3) - 2, 0);

let totalFuelReq = input
  .map(i => parseInt(i, 10))
  .map(fuelReq)
  .reduce((acc, next) => acc + next, 0);

console.log('Part 1: ', totalFuelReq);

const fuelReq2 = (mass) => {
  let fuel = fuelReq(mass);

  let additionalFuelReq = fuelReq(fuel);

  while (additionalFuelReq > 0) {
    fuel += additionalFuelReq;

    additionalFuelReq = fuelReq(additionalFuelReq);
  }

  return fuel;
}

let totalFuelReq2 = input
  .map(i => parseInt(i, 10))
  .map(fuelReq2)
  .reduce((acc, next) => acc + next, 0);

console.log('Part 2: ', totalFuelReq2);
