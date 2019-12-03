const fs = require('fs')

/**
 * Read file and split on rows
 */
module.exports.readInput = file => fs.readFileSync(file, 'utf-8')
  .trim()
  .split('\n')
