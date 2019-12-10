const {
  parseMap, getAngle, deg2rad, rad2deg
} = require('./part1')

const getDistance = (a, b) => Math.sqrt(Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2))

const part2 = module.exports = (input, x, y, vaporizedIndex) => { // eslint-disable-line no-unused-vars
  const map = parseMap(input)

  const asteroids = Object.keys(map).map(key => key.split(',').map(v => parseInt(v, 10))).filter(a => !(a[0] === x && a[1] === y))
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

  const angleKeys = Object.keys(angles).sort((a, b) => (rad2deg(a) < rad2deg(b) ? -1 : 1))
  let index = angleKeys.indexOf(deg2rad(270).toString())

  const step = () => {
    const angle = angleKeys[index]

    // SHOOT
    if (angles[angle]) {
      const [asteroid] = angles[angle].splice(0, 1)
      vaporizations.push(asteroid)

      if (angles[angle].length === 0) delete angles[angle]
    }

    index = (index + 1) % angleKeys.length
  }

  while (Object.keys(angles).length > 0) {
    step()
  }

  return vaporizations[vaporizedIndex - 1][0] * 100 + vaporizations[vaporizedIndex - 1][1]
}

part2.getDistance = getDistance
