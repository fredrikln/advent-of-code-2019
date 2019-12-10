const parseMap = map => {
  const coords = {}

  map.trim().split('\n').forEach((row, y) => row.trim().split('').forEach((col, x) => {
    if (col === '#') coords[`${x},${y}`] = true
  }))

  return coords
}

const getAngle = (x, y) => {
  const angle = Math.atan2(y, x)

  return angle
}
const deg2rad = deg => deg * (Math.PI/180)
const rad2deg = rad => rad / (Math.PI/180)

const numObservableAsteroids = (map, x, y) => {
  const angles = new Set()
  const asteroids = Object.keys(map)
    .map(key => key.split(',')
      .map(v =>
        parseInt(v, 10)
      )
    )

  for (const asteroid of asteroids) {
    if (asteroid[0] === x && asteroid[1] === y) continue

    const angle = getAngle(asteroid[0] - x, asteroid[1] - y)

    angles.add(angle)
  }

  return angles.size
}

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const map = parseMap(input)

  const asteroids = Object.keys(map)
    .map(key =>
      key.split(',').map(
        v => parseInt(v, 10)
      )
    )

  let maxObservable = 0
  let maxObservableAsteroid = null

  for (const asteroid of asteroids) {
    const observable = numObservableAsteroids(map, asteroid[0], asteroid[1])

    if (maxObservable < observable) {
      maxObservable = observable
      maxObservableAsteroid = asteroid
    }
  }

  return [maxObservable, maxObservableAsteroid]
}

part1.parseMap = parseMap
part1.numObservableAsteroids = numObservableAsteroids
part1.getAngle = getAngle
part1.rad2deg = rad2deg
part1.deg2rad = deg2rad
