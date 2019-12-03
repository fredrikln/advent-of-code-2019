module.exports = (wires) => {
  const grid = {0: {}};

  const markGrid = (x, y, index) => {
    if (!grid[y]) grid[y] = {};

    if (!grid[y][x]) grid[y][x] = {};

    grid[y][x][index] = 1;
  }

  wires.forEach((wire, index) => {
    const instructions = wire.split(',');

    let x = 0;
    let y = 0;

    instructions.forEach(instruction => {
      const direction = instruction.substring(0,1);
      const steps = parseInt(instruction.slice(1));

      let dirX = 0;
      let dirY = 0;

      switch(direction) {
        case 'U':
          dirY = 1;
          break;

        case 'D':
          dirY = -1;
          break;

        case 'L':
          dirX = -1;
          break;

        case 'R':
          dirX = 1;
          break;
      }

      for (let i = 0; i < steps; i++) {
        x += dirX;
        y += dirY;

        markGrid(x,y, index);
      }
    });
  });

  let minDistance = Number.MAX_VALUE;
  Object.keys(grid).forEach(y => {
    Object.keys(grid[y]).forEach(x => {
      if (Object.keys(grid[y][x]).length > 1) {
        const distance = Math.abs(x) + Math.abs(y);
        if (distance !== 0 && distance < minDistance) minDistance = distance;
      }
    });
  });

  return minDistance;
}
