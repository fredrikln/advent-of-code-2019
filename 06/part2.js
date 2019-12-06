const { createStructure } = require('./part1')

const createParentNameArray = object => {
  if (object.parent) return [object.parent.name].concat(createParentNameArray(object.parent))
  return []
}

module.exports = input => { // eslint-disable-line no-unused-vars
  const objects = createStructure(input)

  const youParentList = createParentNameArray(objects['YOU'])
  const santaParentList = createParentNameArray(objects['SAN'])

  const youUnique = youParentList.filter(val => santaParentList.indexOf(val) === -1)
  const santaUnique = santaParentList.filter(val => youParentList.indexOf(val) === -1)

  return youUnique.length + santaUnique.length
}
