const { assert } = require('chai') // eslint-disable-line no-unused-vars

const part1 = require('./part1') // eslint-disable-line no-unused-vars
const part2 = require('./part2') // eslint-disable-line no-unused-vars

const parseMap = part1.parseMap
const numObservableAsteroids = part1.numObservableAsteroids
const getAngle = part1.getAngle
const deg2rad = part1.deg2rad
const getDistance = part2.getDistance

describe('Day 10', function() {
  describe('Part 1', function() {
    it('can parse map', function() {
      const input = `.#..#
      .....
      #####
      ....#
      ...##`

      const map = parseMap(input)

      assert.deepEqual(map, {
        '1,0': true,
        '4,0': true,
        '0,2': true,
        '1,2': true,
        '2,2': true,
        '3,2': true,
        '4,2': true,
        '4,3': true,
        '3,4': true,
        '4,4': true,
      })
    })

    it('calculates observable asteroids', function() {
      const input = `.#..#
      .....
      #####
      ....#
      ...##`
      const map = parseMap(input)

      assert.equal(numObservableAsteroids(map, 1, 0), 7)
      assert.equal(numObservableAsteroids(map, 3, 4), 8)
      assert.equal(numObservableAsteroids(map, 4, 2), 5)
    })

    it('calculates angles', function() {
      // [0,0] -> [0,-1]
      assert.equal(getAngle(0, -1), deg2rad(-90))

      // [0,0] -> [1,0]
      assert.equal(getAngle(1, 0), deg2rad(0))

      // [0,0] -> [0,1]
      assert.equal(getAngle(0, 1), deg2rad(90))

      // [0,0] -> [-1,0]
      assert.equal(getAngle(-1, 0), deg2rad(180))
    })

    it('gets correct max observable', function() {
      let input = `.#..#
      .....
      #####
      ....#
      ...##`

      assert.equal(part1(input)[0], 8)

      input = `......#.#.
      #..#.#....
      ..#######.
      .#.#.###..
      .#..#.....
      ..#....#.#
      #..#....#.
      .##.#..###
      ##...#..#.
      .#....####`

      assert.equal(part1(input)[0], 33)

      input = `.#..#..###
      ####.###.#
      ....###.#.
      ..###.##.#
      ##.##.#.#.
      ....###..#
      ..#.#..#.#
      #..#.#.###
      .##...##.#
      .....#.#..`

      assert.equal(part1(input)[0], 41)

      input = `.#..##.###...#######
      ##.############..##.
      .#.######.########.#
      .###.#######.####.#.
      #####.##.#.##.###.##
      ..#####..#.#########
      ####################
      #.####....###.#.#.##
      ##.#################
      #####.##.###..####..
      ..######..##.#######
      ####.##.####...##..#
      .#####..#.######.###
      ##...#.##########...
      #.##########.#######
      .####.#.###.###.#.##
      ....##.##.###..#####
      .#.#.###########.###
      #.#.#.#####.####.###
      ###.##.####.##.#..##`

      assert.equal(part1(input)[0], 210)
    })
  })

  describe('Part 2', function() {
    it('calculates distance', function() {
      assert.equal(getDistance([0, 0], [0, -1]), 1)
      assert.equal(getDistance([0, 0], [0, 1]), 1)
      assert.equal(getDistance([0, 0], [-1, 0]), 1)
      assert.equal(getDistance([0, 0], [1, 0]), 1)
      assert.equal(getDistance([-1, 0], [1, 0]), 2)
      assert.equal(getDistance([-1, -1], [1, 1]), Math.sqrt(Math.pow(-1 - 1, 2) + Math.pow(-1 - 1, 2)))
    })

    it('finds vaporized asteroids', function() {
      let input = `.#....#####...#..
      ##...##.#####..##
      ##...#...#.#####.
      ..#........###..
      ..#.#.....#....##`

      assert.equal(part2(input, 8, 3, 1), 801)
      assert.equal(part2(input, 8, 3, 2), 900)
      assert.equal(part2(input, 8, 3, 3), 901)
      assert.equal(part2(input, 8, 3, 4), 1000)
      assert.equal(part2(input, 8, 3, 5), 902)

      input = `.#..##.###...#######
      ##.############..##.
      .#.######.########.#
      .###.#######.####.#.
      #####.##.#.##.###.##
      ..#####..#.#########
      ####################
      #.####....###.#.#.##
      ##.#################
      #####.##.###..####..
      ..######..##.#######
      ####.##.####...##..#
      .#####..#.######.###
      ##...#.##########...
      #.##########.#######
      .####.#.###.###.#.##
      ....##.##.###..#####
      .#.#.###########.###
      #.#.#.#####.####.###
      ###.##.####.##.#..##`

      assert.equal(part2(input, 11, 13, 1), 1112)
      assert.equal(part2(input, 11, 13, 2), 1201)
      assert.equal(part2(input, 11, 13, 3), 1202)
      assert.equal(part2(input, 11, 13, 10), 1208)
      assert.equal(part2(input, 11, 13, 20), 1600)
      assert.equal(part2(input, 11, 13, 50), 1609)
      assert.equal(part2(input, 11, 13, 100), 1016)
      assert.equal(part2(input, 11, 13, 199), 906)
      assert.equal(part2(input, 11, 13, 200), 802)
      assert.equal(part2(input, 11, 13, 201), 1009)
      assert.equal(part2(input, 11, 13, 299), 1101)
    })
  })
})
