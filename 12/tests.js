const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const parseInput = part1.parseInput
const step = part1.step
const takeSteps = part1.takeSteps
const calculateSystemEnergy = part1.calculateSystemEnergy
const findCycle = part2.findCycle

describe('Day 12', function() {
  describe('Part 1', function() {
    it('parses input', function() {
      const input = [
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>',
      ]

      const expected = [
        {
          position: {
            x: -1, y: 0, z: 2
          },
          velocity: {
            x: 0, y: 0, z: 0
          }
        },
        {
          position: {
            x: 2, y: -10, z: -7
          },
          velocity: {
            x: 0, y: 0, z: 0
          }
        },
        {
          position: {
            x: 4, y: -8, z: 8
          },
          velocity: {
            x: 0, y: 0, z: 0
          }
        },
        {
          position: {
            x: 3, y: 5, z: -1
          },
          velocity: {
            x: 0, y: 0, z: 0
          }
        },
      ]

      const parsed = parseInput(input)

      assert.deepEqual(parsed, expected)
    })

    it('takes step', function() {
      const moons = parseInput([
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>',
      ])
      const newMoons = step(moons)

      const expected = [
        {
          position: {
            x: 2, y: -1, z: 1
          },
          velocity: {
            x: 3, y: -1, z: -1
          }
        },
        {
          position: {
            x: 3, y: -7, z: -4
          },
          velocity: {
            x: 1, y: 3, z: 3
          }
        },
        {
          position: {
            x: 1, y: -7, z: 5
          },
          velocity: {
            x: -3, y: 1, z: -3
          }
        },
        {
          position: {
            x: 2, y: 2, z: 0
          },
          velocity: {
            x: -1, y: -3, z: 1
          }
        },
      ]

      assert.deepEqual(newMoons, expected)
    })

    it('looks correct after 10 steps', function() {
      const moons = parseInput([
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>',
      ])

      const newMoons = takeSteps(moons, 10)

      const expected = [
        {
          position: {
            x: 2, y: 1, z: -3
          },
          velocity: {
            x: -3, y: -2, z: 1
          }
        },
        {
          position: {
            x: 1, y: -8, z: 0
          },
          velocity: {
            x: -1, y: 1, z: 3
          }
        },
        {
          position: {
            x: 3, y: -6, z: 1
          },
          velocity: {
            x: 3, y: 2, z: -3
          }
        },
        {
          position: {
            x: 2, y: 0, z: 4
          },
          velocity: {
            x: 1, y: -1, z: -1
          }
        },
      ]

      assert.deepEqual(newMoons, expected)
    })

    it('calculates energies', function() {
      const moons = parseInput([
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>',
      ])

      const newMoons = takeSteps(moons, 10)

      const systemEnergy = calculateSystemEnergy(newMoons)

      assert.equal(systemEnergy, 179)
    })

    it('calculates energies 2', function() {
      const moons = parseInput([
        '<x=-8, y=-10, z=0>',
        '<x=5, y=5, z=10>',
        '<x=2, y=-7, z=3>',
        '<x=9, y=-8, z=-3>',
      ])

      const newMoons = takeSteps(moons, 100)

      const systemEnergy = calculateSystemEnergy(newMoons)

      assert.equal(systemEnergy, 1940)
    })
  })

  describe('Part 2', function() {
    it('finds cycle 1', function() {
      const input = [
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>',
      ]
      const newMoons = parseInput(input)

      assert.equal(findCycle(newMoons), 2772)
    })

    it('finds cycle 2', function() {
      const input = [
        '<x=-8, y=-10, z=0>',
        '<x=5, y=5, z=10>',
        '<x=2, y=-7, z=3>',
        '<x=9, y=-8, z=-3>',
      ]
      const newMoons = parseInput(input)

      assert.equal(findCycle(newMoons), 4686774924)
    })
  })
})
