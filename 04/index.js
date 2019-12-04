const { readInput } = require('../utils')

const input = readInput('./input.txt')

const [start, end] = input[0].split('-').map(Number)

const part1 = require('./part1')
const part2 = require('./part2')

const passwords = Array.from({ length: (end + 1) - start }, (_, i) => i + start).filter(part1)

console.log('Part 1:', passwords.length)

const passwords2 = Array.from({ length: (end + 1) - start }, (_, i) => i + start).filter(part2)

console.log('Part 2:', passwords2.length)
