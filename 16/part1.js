const basePattern = [
  0, 1, 0, -1
]

const getMultiplier = (inputNo, elementNo) => {
  const num = Math.floor((inputNo + 1) / (elementNo + 1))
  const location = (num % basePattern.length)

  return basePattern[location]
}

const part1 = module.exports = (input, phases = 100, start = 0) => {// eslint-disable-line no-unused-vars
  const elements = input.split('').map(e => parseInt(e, 10))

  for (let phase = 0; phase < phases; phase++) {
    if (start > elements.length / 2) {
      for (let i = elements.length - 1; i >= start; i--) {
        elements[i] = Math.abs((elements[i+1] || 0) + elements[i]) % 10
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        let sum = 0

        for (let j = i; j < elements.length; j++) {
          const multiplier = getMultiplier(j, i)
          sum += elements[j] * multiplier
        }

        elements[i] = Math.abs(sum) % 10
      }
    }
  }

  return elements
    .slice(start, start + 8)
    .join('')
}
