const { readInput } = require('../utils')

const input = readInput('./input.txt')

const part1 = require('./part1')
const part2 = require('./part2')

part1(input[0], 1, val => console.log(`Part 1: ${val}`))
part2(input[0], 5, val => console.log(`Part 2: ${val}`))
