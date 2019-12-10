const {
  parseMap, getAngle, deg2rad, rad2deg
} = require('./part1')

const getDistance = (a, b) => Math.sqrt(Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2))

const part2 = module.exports = (input, x, y, vaporizedIndex) => { // eslint-disable-line no-unused-vars
  const map = parseMap(input)

  const asteroids = Object.keys(map)
    .map(key =>
      key.split(',')
        .map(v =>
          parseInt(v, 10)
        )
    )
    .filter(a => !(a[0] === x && a[1] === y))

  const angles = {}
  asteroids.forEach(a => {
    const angle = getAngle(a[0] - x, a[1] - y)
    if (!angles[angle]) angles[angle] = []
    angles[angle].push(a)
  })

  Object.keys(angles).forEach(key => {
    const asteroids = angles[key]

    angles[key] = asteroids.sort((a, b) => (getDistance([x, y], a) < getDistance([x, y], b) ? -1 : 1))
  })

  const vaporizations = []

  let angleKeys = Object.keys(angles)
    .sort((a, b) => (rad2deg(a) < rad2deg(b) ? -1 : 1))

  let index = angleKeys.indexOf(deg2rad(-90).toString())

  // const height = input.split('\n').length
  // const width = input.split('\n')[0].length

  // const drawMap = () => {
  //   const out = input.split('\n')

  //   vaporizations.forEach(v => {
  //     out[v[1]] = out[v[1]].substring(0, v[0]) + '.' + out[v[1]].substring(v[0] + 1)
  //   })
  //   out[y] = out[y].substring(0, x) + 'O' + out[y].substring(x + 1)

  //   process.stdout.write('\033c')
  //   console.log(out)
  // }

  const step = () => {
    const angle = angleKeys[index]

    // SHOOT
    if (angles[angle]) {
      const [asteroid] = angles[angle].splice(0, 1)
      vaporizations.push(asteroid)

      if (angles[angle].length === 0) {
        angleKeys = [...angleKeys.slice(0, index), ...angleKeys.slice(index + 1)]
        delete angles[angle]
        index--
      }
    }

    index = (index + 1) % angleKeys.length
  }

  // const takeStep = () => {
  //   if (Object.keys(angles).length > 0) {
  //     step()
  //     drawMap()

  //     setTimeout(takeStep, 16.6667)
  //   }
  // }

  // takeStep()

  while (Object.keys(angles).length > 0) {
    step()
  }

  return vaporizations[vaporizedIndex - 1][0] * 100 + vaporizations[vaporizedIndex - 1][1]
}

part2.getDistance = getDistance
