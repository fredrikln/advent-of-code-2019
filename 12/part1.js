const pattern = /<x=(-?[0-9]+), y=(-?[0-9]+), z=(-?[0-9]+)>/

const parseInput = input => input.map(moon => {
  const [
    , x, y, z
  ] = moon.match(pattern)

  return {
    position: {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      z: parseInt(z, 10),
    },
    velocity: {
      x: 0,
      y: 0,
      z: 0,
    }
  }
})

const step = moons => {
  const newMoons = []

  for (let i = 0; i < moons.length; i++) {
    const moon = Object.assign({}, moons[i])

    for (let j = i+1; j < moons.length; j++) {
      const moon2 = Object.assign({}, moons[j])

      if (moon.position.x < moon2.position.x) {
        moon.velocity.x++
        moon2.velocity.x--
      } else if (moon.position.x > moon2.position.x) {
        moon.velocity.x--
        moon2.velocity.x++
      }

      if (moon.position.y < moon2.position.y) {
        moon.velocity.y++
        moon2.velocity.y--
      } else if (moon.position.y > moon2.position.y) {
        moon.velocity.y--
        moon2.velocity.y++
      }

      if (moon.position.z < moon2.position.z) {
        moon.velocity.z++
        moon2.velocity.z--
      } else if (moon.position.z > moon2.position.z) {
        moon.velocity.z--
        moon2.velocity.z++
      }
    }

    newMoons.push(moon)
  }

  for (const moon of newMoons) {
    moon.position.x += moon.velocity.x
    moon.position.y += moon.velocity.y
    moon.position.z += moon.velocity.z
  }

  return newMoons
}

const takeSteps = (moons, numSteps) => {
  let newMoons

  for (let i = 0; i < numSteps; i++) {
    newMoons = step(moons)
  }

  return newMoons
}

const calculateEnergies = moon => [
  Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z),
  Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z)
]

const calculateSystemEnergy = moons => moons.reduce((acc, moon) => {
  const energies = calculateEnergies(moon)

  acc += energies[0] * energies[1]

  return acc
}, 0)

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const moons = parseInput(input)

  const newMoons = takeSteps(moons, 1000)

  const systemEnergy = calculateSystemEnergy(newMoons)

  return systemEnergy
}

part1.parseInput = parseInput
part1.step = step
part1.takeSteps = takeSteps
part1.calculateSystemEnergy = calculateSystemEnergy
