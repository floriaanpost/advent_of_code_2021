const fs = require('fs')

const octopusesOriginal = fs.readFileSync('./input', 'utf-8')
  .split('\n')
  .map(l => ([...l]))
  .map(r => r.map(n => Number(n)))

const neighbours = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]

// part 1
{
  const octopuses = octopusesOriginal.map(row => [...row]) // copy orignal octopuses
  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    flashes += simulateStep(octopuses);
  }
  console.log(flashes)
}

// part 2
{
  const octopuses = octopusesOriginal.map(row => [...row]) // copy orignal octopuses
  let step = 0;
  let flashes = 0;
  while (flashes < 100) {
    flashes = simulateStep(octopuses)
    step++
  }
  console.log(step)
}

function simulateStep(octopuses) {
  let flashes = 0;
  forEachPosition(octopuses, (r, c) => octopuses[r][c]++) // increase all by one
  forEachPosition(octopuses, (r, c) => {
    flashes += flashOctopuses(octopuses, r, c) // flash octopuses
  })
  return flashes
}

function forEachPosition(octopuses, cb) {
  octopuses.forEach((row, r) => row.forEach((_, c) => cb(r, c)))
}

function forEachValidNeigbour(octopuses, r, c, cb) {
  neighbours.forEach(([dr, dc]) => {
    const rn = r + dr
    const cn = c + dc
    if (rn < 0 || rn >= octopuses.length || cn < 0 || cn >= octopuses[0].length || octopuses[rn][cn] == 0) return
    cb(rn, cn)
  })
}

function flashOctopuses(octopuses, r, c) {
  let flashCount = 0;
  if (octopuses[r][c] >= 10) {
    octopuses[r][c] = 0
    flashCount++;
    forEachValidNeigbour(octopuses, r, c, (rn, cn) => {
      octopuses[rn][cn]++
      flashCount += flashOctopuses(octopuses, rn, cn)
    })
  }
  return flashCount
}