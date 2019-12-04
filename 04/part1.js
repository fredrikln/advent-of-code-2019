const hasAdjacentDigits = value => {
  const valString = value.toString()

  for (let i = 0; i < valString.length - 1; i++) {
    if (valString[i] === valString[i+1]) { return true }
  }

  return false
}

const hasIncreasingDigits = value => {
  const valString = value.toString()

  for (let i = 0; i < valString.length - 1; i++) {
    if (valString[i] > valString[i+1]) { return false }
  }

  return true
}

module.exports = input =>
  hasAdjacentDigits(input) && hasIncreasingDigits(input)
