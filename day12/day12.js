const fs = require('fs')

const map = fs.readFileSync('input', 'utf-8')
  .split("\n")
  .map((l) => l.split('-'))
  .reduce((caves, conn) => ({
    ...caves, 
    [conn[0]]: [...(caves[conn[0]] ?? []), conn[1]],
    [conn[1]]: [...(caves[conn[1]] ?? []), conn[0]],
  }), {})

function findRoutes(start, visitSmallCaveTwice) {
  function recursiveFind(route, isSmallCaveVisitedTwice) {
    const cave = route[route.length - 1]
    const options = map[cave]
    if (cave == "end") return [route]
    return options.reduce((routes, option) => {
      if (option == "start") return routes
      const isLargeCave = option === option.toUpperCase()
      const mayVisit = isLargeCave || !route.includes(option)
      if (!mayVisit && isSmallCaveVisitedTwice) return routes
      return [...routes, ...recursiveFind([...route, option], isSmallCaveVisitedTwice || !mayVisit)]
    }, [])
  }
  return recursiveFind([start], !visitSmallCaveTwice)
}

console.log(findRoutes('start', false).length)
console.log(findRoutes('start', true).length)
