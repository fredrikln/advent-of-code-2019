
const parseIngredient = ingredient => {
  const [count, name] = ingredient.split(' ')

  return [name, parseInt(count, 10)]
}

const parseReactions = reactions => reactions
  .map(reaction => reaction.split(' => ')
    .map(r => r.split(', ')))
  .map(([source, target]) => {
    target = parseIngredient(target[0])
    source = source.map(ingredient => parseIngredient(ingredient))

    return [target, source]
  })

const calculateOre = (reactions, element = 'FUEL', amount = 1, waste = {}) => {
  const parsedReactions = parseReactions(reactions)

  const quantityNeeded = amount - (waste[element] || 0)
  if (quantityNeeded <= 0) {
    waste[element] -= amount
    return 0
  }

  const reaction = parsedReactions.find(r => r[0][0] === element)
  const quantityProduced = reaction[0][1]
  const times = Math.ceil(quantityNeeded / quantityProduced)
  waste[element] = (quantityProduced * times) - quantityNeeded

  const newElements = reaction[1]

  return newElements.map(([element, amount]) => {
    if (element === 'ORE') return amount * times
    else return calculateOre(reactions, element, amount * times, waste)
  }).reduce((acc, next) => acc + next, 0)
}

const part1 = module.exports = input =>  // eslint-disable-line no-unused-vars
  calculateOre(input, 'FUEL', 1)

part1.calculateOre = calculateOre
