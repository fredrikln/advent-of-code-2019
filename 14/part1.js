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

const react = (solution, reactions) => {
  const out = Object.assign({}, solution)
  const waste = {}

  let counter = 0
  while (Object.keys(out).filter(k => k !== 'ORE').length > 0) {
    let didReact = false
    for (const element of Object.keys(out)) {
      if (element === 'ORE') continue

      const elementCount = out[element]

      const reaction = reactions.find(reaction => reaction[0][0] === element)

      const neededForReaction = reaction[0][1]
      const newElements = reaction[1]

      const numFullySatisfiedReactions = Math.floor(elementCount / neededForReaction)

      out[element] -= numFullySatisfiedReactions * neededForReaction
      if (numFullySatisfiedReactions > 0) didReact = true

      for (const [newElement, count] of newElements) {
        if (!out[newElement]) out[newElement] = 0
        if (!waste[newElement]) waste[newElement] = 0

        out[newElement] += numFullySatisfiedReactions * count
      }
    }

    // What to do with the unreacted ones???
    if (!didReact) {
      for (const element of Object.keys(out)) {
        if (element === 'ORE') continue

        const elementCount = out[element]

        if (elementCount === 0) continue

        const reaction = reactions.find(reaction => reaction[0][0] === element)

        const neededForReaction = reaction[0][1]
        const newElements = reaction[1]

        const extra = neededForReaction - elementCount
        // console.log(element, neededForReaction, elementCount)

        for (const [newElement, count] of newElements) {
          if (!out[newElement]) out[newElement] = 0
          if (!waste[newElement]) waste[newElement] = 0

          // out[newElement] += count
        }

        break
      }
    }


    console.log('out', out)
    console.log('waste', waste)

    counter++
    if (counter > 99) break
  }

  return out['ORE'] + waste['ORE']
}

const calculateOre = reactions => {
  const parsedReactions = parseReactions(reactions)

  const solution = { FUEL: 1 }

  return react(solution, parsedReactions)
}

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars

}

part1.calculateOre = calculateOre
