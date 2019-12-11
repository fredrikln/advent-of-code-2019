const { getLayers } = require('./part1')

const BLACK = 0 // eslint-disable-line no-unused-vars
const WHITE = 1 // eslint-disable-line no-unused-vars
const TRANSPARENT = 2 // eslint-disable-line no-unused-vars

const generateImage = (layers, cols, rows) => {
  const out = Array.from({ length: cols*rows }, () => TRANSPARENT)

  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i]

    for (let j = 0; j < layer.length; j++) {
      const pixel = parseInt(layer[j], 10)

      if (pixel !== TRANSPARENT) {
        out[j] = pixel
      }
    }
  }

  return out.join('')
}

/* istanbul ignore next */
const printImage = (image, cols, rows) => {
  for (let i = 0; i < rows; i++) {
    let row = ''
    for (let j = 0; j < cols; j++) {
      const char = image[i*cols + j]
      row += (parseInt(char, 10) === WHITE) ? '#' : ' '
    }
    console.log(row)
  }
}

const part2 = module.exports = (input, width = 25, height = 6) => { // eslint-disable-line no-unused-vars
  const layers = getLayers(input, width, height)
  const image = generateImage(layers, width, height)

  return image
}

part2.generateImage = generateImage
part2.printImage = printImage
