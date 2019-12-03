const fs = require('fs')

/**
 * Read file and split on rows
 */
const readInput = (file) => fs.readFileSync(file, 'utf-8')
  .trim()
  .split('\n')

module.exports = {
  readInput
}
