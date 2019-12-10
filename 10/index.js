const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim()

const part1 = require('./part1')
const part2 = require('./part2')

const [maxObservable, maxObservableAsteroid] = part1(input)

console.log('Part 1:', maxObservable)

console.log('Part 2:', part2(input, maxObservableAsteroid[0], maxObservableAsteroid[1], 200))
