const createObject = name => ({
  name: name,
  children: [],
  parent: null
})

const createStructure = input => {
  const objects = {}

  input.forEach(orbit => {
    const [a, b] = orbit.split(')')

    if (!objects[a]) objects[a] = createObject(a)
    if (!objects[b]) objects[b] = createObject(b)
    objects[a].children.push(objects[b])
    objects[b].parent = objects[a]
  })

  return objects
}

const countParents = object => (object.parent ? countParents(object.parent) + 1 : 0)

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const objects = createStructure(input)

  return Object.values(objects).reduce((acc, object) => countParents(object) + acc, 0)
}

part1.createStructure = createStructure
