const Intcode = require('../utils/intcode2')

const part1 = module.exports = async input => { // eslint-disable-line no-unused-vars
  const getValueAt = async (x, y) => new Promise(function(resolve) {
    const computer = new Intcode({ memory: input })
    computer.addInput([x, y])
    computer.addOutput(val => resolve(val))
    computer.run()
  })

  let counter = 0
  let out = ''
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      const value = await getValueAt(i, j)

      if (value) {
        out += '#'
        counter++
      } else {
        out += '.'
      }
    }
    out += '\n'
  }
  console.log(out)
  console.log('Part 1:', counter)
}
