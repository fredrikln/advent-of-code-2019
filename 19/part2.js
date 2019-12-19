const Intcode = require('../utils/intcode2')

const part2 = module.exports = async input => { // eslint-disable-line no-unused-vars
  const getValueAt = async (x, y) => new Promise(function(resolve) {
    const computer = new Intcode({ memory: input })
    computer.addInput([x, y])
    computer.addOutput(val => resolve(val))
    computer.run()
  })

  let y = 0
  const shipFits = false

  let lastX = 0
  while (!shipFits) {
    let x = lastX

    while (!shipFits) {
      const value = await getValueAt(x, y)

      if (value) {
        lastX = x - 10

        if (y - 100 > 0) {
          const minusY = await getValueAt(x, y-99)
          const minusYplusX = await getValueAt(x+99, y-99)

          if (minusY && minusYplusX) {
            console.log('Part 2:', (x * 10000) + (y-99))
            return
          }
        }

        break
      }

      if (x > y*2) break

      x++
    }

    y++
  }
}
