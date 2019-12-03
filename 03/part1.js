module.exports = (wires) => {
  const grid = {};

  const markGrid = (wire, x, y, steps) => {
    const key = `${x},${y}`;

    if (!grid[key]) grid[key] = {};

    grid[key][wire] = steps;
  }

  wires.forEach((wire, index) => {
    const instructions = wire.split(',');

    let x = 0;
    let y = 0;

    let totalSteps = 0;

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

        totalSteps++;

        markGrid(index, x, y, totalSteps);
      }
    });
  });

  let minDistance = Number.MAX_VALUE;
  Object.keys(grid).forEach(key => {
    if (Object.keys(grid[key]).length > 1) {
      const parts = key.split(',');
      const distance = Math.abs(parts[0]) + Math.abs(parts[1]);
      if (distance !== 0 && distance < minDistance) minDistance = distance;
    }
  });

  return minDistance;
}
