const part1 = require('./part1')

const hasAtleastOneExactlyDouble = value => {
  const valString = value.toString()

  for (let i = 0; i < valString.length - 1; i++) {
    if (valString[i] !== valString[i-1] && valString[i] === valString[i+1] && valString[i] !== valString[i+2]) return true
  }

  return false
}

module.exports = input =>
  part1(input) && hasAtleastOneExactlyDouble(input)
