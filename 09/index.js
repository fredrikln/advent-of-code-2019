const { readInput } = require('../utils')

const input = readInput('./input.txt')[0]

const part1 = require('./part1')
const part2 = require('./part2')

part1(input, val => console.log('Part 1:', val))

part2(input, val => console.log('Part 2:', val))
