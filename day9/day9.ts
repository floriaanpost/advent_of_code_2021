import fs from 'fs'

const data = fs.readFileSync('./input', 'utf-8')
  .split("\n")
  .map(row => [...row])
  .map(row => row.map(n => Number(n)))

const neighbours = [[0, -1], [0, 1], [-1, 0], [1, 0]]

function findLowPoints(data: number[][]) {
  const lowPoints: number[][] = []
  for (let row = 0; row < data.length; row++) {
    for (let column = 0; column < data[0].length; column++) {
      const heigth = data[row][column]
      let lowPoint = true;
      for (let [drow, dcol] of neighbours) {
        const checkRow = row + drow
        const checkCol = column + dcol
        if (checkRow < 0 || checkRow >= data.length || checkCol < 0 || checkCol >= data[0].length) {
          continue
        }
        if (data[checkRow][checkCol] <= heigth) {
          lowPoint = false;
          break
        }
      }
      if (lowPoint) {
        lowPoints.push([row, column])
      }
    }
  }
  return lowPoints
}

function inPositionArray(arr: number[][], [row, column]: number[]) {
  return arr.some(([r, c]) => r == row && c == column)
}

function findBasinsSizes(data: number[][], lowPoints: number[][]) {
  const basinSizes: number[] = []
  for (let lowPoint of lowPoints) {
    let check = [lowPoint]
    const done: number[][] = []
    let basinSize = 1
    while (check.length > 0) {
      const newCheck: number[][] = []
      for (const [row, column] of check) {
        for (let [drow, dcol] of neighbours) {
          const checkRow = row + drow
          const checkCol = column + dcol
          if (
            (checkRow < 0 || checkRow >= data.length || checkCol < 0 || checkCol >= data[0].length) || 
            (inPositionArray(done, [checkRow, checkCol]) || inPositionArray(newCheck, [checkRow, checkCol])) ||
            (data[checkRow][checkCol] >= 9))  {
            continue
          }
          basinSize++
          newCheck.push([checkRow, checkCol])
        }
        done.push([row, column])
      }
      check = newCheck;
    }
    basinSizes.push(basinSize)
  }
  return basinSizes
}

const lowPoints = findLowPoints(data)

const solutionPart1 = lowPoints
  .map(([row, column]) => data[row][column] + 1)
  .reduce((tot, h) => tot + h)

console.log(solutionPart1)

const solutionPart2 = findBasinsSizes(data, lowPoints)
  .sort((s1, s2) => s2 - s1)
  .slice(0, 3)
  .reduce((tot, size) => tot*size, 1)

console.log(solutionPart2)