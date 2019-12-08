const { readInput } = require('../utils')

const input = readInput('./input.txt')[0]

const part1 = require('./part1')
const part2 = require('./part2')

const printImage = part2.printImage

console.log('Part 1:', part1(input))

const image = part2(input)
console.log('Part 2:')
printImage(image, 25, 6)
