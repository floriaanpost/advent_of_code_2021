const fs = require("fs");

const [dotData, instructionData] = fs
  .readFileSync("input", "utf-8")
  .split("\n\n")
  .map((part) => part.split("\n"));

const dotPositions = dotData.map((dot) => dot.split(",").map((d) => Number(d)));

function uniquePoints(points) {
  return [...new Set(points.map((point) => point.join(",")))].map((point) =>
    point.split(",").map((v) => Number(v))
  );
}

const solution = instructionData
  .map((instruction) => ({
    axis: instruction[11] == "x" ? 0 : 1,
    position: Number(instruction.substring(13)),
  }))
  .reduce((dotPositions, { axis, position }, ix) => {
    // answer of part 1
    if (ix === 1) console.log(uniquePoints(dotPositions).length);
    return dotPositions.map((point) =>
      point[axis] < position
        ? point
        : point.map((v, ix) =>
            ix == axis ? position - (point[axis] - position) : v
          )
    );
  }, dotPositions);

function visualize(points) {
  const [xmax, ymax] = points.reduce(
    ([xmax, ymax], point) => [
      point[0] > xmax ? point[0] : xmax,
      point[1] > ymax ? point[1] : ymax,
    ],
    [0, 0]
  );
  const field = new Array(ymax + 1).fill(new Array(xmax + 1).fill("."));
  const strfield = points
    .reduce(
      (field, [x, y]) =>
        field.map((row, rowix) =>
          row.map((v, colix) => (rowix == y && colix == x ? "#" : v))
        ),
      field
    )
    .map((row) => row.join(""))
    .join("\n");
  console.log(strfield);
}

visualize(solution);
