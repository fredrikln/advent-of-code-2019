class Map {
  constructor({
    map, keys = {}, doors = {}
  }) {
    this.map = map
    this.keys = keys
    this.doors = doors
  }

  passable(x, y, keys) {
    if (this.map[[x, y]] === '#') return false
    if (this.doors[[x, y]]) {
      const door = this.doors[[x, y]]
      const key = String.fromCharCode(door.charCodeAt(0) + 32)

      if (keys.indexOf(key) === -1) return false

      return true
    }
  }

  draw(currentPosition = []) {
    const out = []
    Object.keys(this.map).forEach(key => {
      let char
      let [x, y] = key.split(',')
      x = parseInt(x)
      y = parseInt(y)

      if (!out[y]) out[y] = []

      if (x === currentPosition[0] && y === currentPosition[1]) {
        char = '@'
      } else if (this.keys[[x, y]]) {
        char = this.keys[[x, y]]
      } else if (this.doors[[x, y]]) {
        char = this.doors[[x, y]]
      } else {
        char = this.map[[x, y]]
      }

      out[y][x] = char
    })

    console.log(out.map(r => r.join('')).join('\n'))
  }
}

const parseMap = rows => {
  const map = {}
  const keys = {}
  const doors = {}
  let startPosition

  for (const y in rows) {
    const cols = rows[y]
    for (const x in cols) {
      const char = cols[x]

      if (char === '#') {
        map[[x, y]] = '#'
      } else {
        map[[x, y]] = '.'

        if (char === '@') {
          startPosition = [parseInt(x), parseInt(y)]
        } else if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
          doors[[x, y]] = char
        } else if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
          // Key
          keys[[x, y]] = char
        }
      }
    }
  }

  return [
    map, keys, doors, startPosition
  ]
}

const part1 = module.exports = input => { // eslint-disable-line no-unused-vars
  const [
    map, keys, doors, startPosition
  ] = parseMap(input)

  const board = new Map({
    map, keys, doors
  })
  board.draw(startPosition)
  console.log(board.passable(3, 1, ['a']))

}
