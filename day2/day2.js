const fs = require('fs')

const directions = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split('\n')
  .map(row => ({direction: row.split(' ')[0], steps: Number(row.split(' ')[1])}))

// part 1
const part1 = directions.reduce((pos, {direction, steps}) => {
    if (direction === 'forward') {
      return {...pos, horizontal: pos.horizontal + steps}
    }
    return {...pos, depth: pos.depth + (direction === 'down' ? steps : -steps)}
  }, {horizontal: 0, depth: 0})

console.log(part1.horizontal * part1.depth)

// part2
const part2 = directions.reduce((pos, {direction, steps}) => {
  if (direction === 'forward') {
    return {...pos, horizontal: pos.horizontal + steps, depth: pos.depth + pos.aim*steps}
  }
  return {...pos, aim: pos.aim + (direction === 'up' ? -steps : steps)}
}, {horizontal: 0, depth: 0, aim: 0})

console.log(part2.horizontal * part2.depth)
