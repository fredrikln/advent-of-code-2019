const fuelReq = require('./part1')

module.exports = mass => {
  let fuel = fuelReq(mass)

  let additionalFuelReq = fuelReq(fuel)

  while (additionalFuelReq > 0) {
    fuel += additionalFuelReq

    additionalFuelReq = fuelReq(additionalFuelReq)
  }

  return fuel
}
