
// const parseIngredient = ingredient => {
//   const [count, name] = ingredient.split(' ')

//   return [name, parseInt(count, 10)]
// }

// const parseReactions = reactions => reactions
//   .map(reaction => reaction.split(' => ')
//     .map(r => r.split(', ')))
//   .map(([source, target]) => {
//     target = parseIngredient(target[0])
//     source = source.map(ingredient => parseIngredient(ingredient))

//     return [target, source]
//   })

// const calculateOre = reactions => {
//   const parsedReactions = parseReactions(reactions)

//   const react = solution => {
//     const out = []

//     solution.forEach(element => {
//       const reaction = parsedReactions.find(r => r[0][0] === element[0])
//       const newElements = reaction[1]

//       const count = element[1]
//       const reactionCount = reaction[0][1]

//       if (newElements[0][0] === 'ORE') {
//         out.push(element)
//       } else {
//         newElements.forEach(newElement => {
//           react([newElement]).forEach(e => out.push([e[0], e[1] * count]))
//         })
//       }
//     })

//     return out
//   }

//   const solution = [['FUEL', 1]]

//   const sum = react(solution).reduce((acc, [element, count]) => {
//     if (!acc[element]) acc[element] = 0

//     acc[element] += count

//     return acc
//   }, {})

//   console.log(sum)

//   return Object.keys(sum).reduce((acc, key) => {
//     const needToCreate = sum[key]
//     const reaction = parsedReactions.find(r => r[0][0] === key[0])

//     const oresToCreate = reaction[1][0][1]

//     const multiplier = Math.ceil(needToCreate / oresToCreate)
//     console.log(needToCreate, oresToCreate, multiplier)

//     acc += Math.ceil(needToCreate / oresToCreate) * oresToCreate

//     return acc
//   }, 0)
// }

// const part1 = module.exports = input => { // eslint-disable-line no-unused-vars

// }

// part1.calculateOre = calculateOre
