const getLayers = (input, cols, rows) => {
  const layerLength = cols * rows

  const layers = []

  for (let i = 0; i < input.length; i++) {
    if (!layers[Math.floor(i / layerLength)]) layers[Math.floor(i / layerLength)] = []

    layers[Math.floor(i / layerLength)].push(input[i])
  }

  return layers.map(l => l.join(''))
}

const countOccurences = input => {
  const out = Array.from({ length: 10 }, () => 0)

  input.split('').forEach(v => out[parseInt(v, 10)]++)

  return out
}

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  let leastZeroes = Number.MAX_VALUE
  let leastZeroesLayer = -1
  const layers = getLayers(input, 25, 6)

  for (let layer of layers) {
    layer = countOccurences(layer)

    if (layer[0] < leastZeroes) {
      leastZeroes = layer[0]
      leastZeroesLayer = layer
    }
  }

  return leastZeroesLayer[1] * leastZeroesLayer[2]
}

part1.getLayers = getLayers

part1.countOccurences = countOccurences
