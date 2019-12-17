const { readInput } = require('../utils')

const input = readInput('./input.txt')[0]

const part1 = require('./part1')
const part2 = require('./part2')

console.log('Part 1:', part1(input))

part2(input)
