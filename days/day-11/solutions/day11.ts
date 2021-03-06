import { raycastEightDirections } from "../../../lib/raycast.ts"
//
// Example input:
//
// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
//
type Seat = "." | "#" | "L";
const matches = (await Deno.readTextFile("/dev/stdin"))
  .matchAll(/[L.]+/g)

const grid = [...matches]
  .map(([match]) => [...match]) as Seat[][]

const FLOOR = ".";
const OCCUPIED = "#"
const EMPTY = "L"
const isOccupied = (seat: Seat) => seat === OCCUPIED ? 1 : 0

//
// --- part 1 ---
//
{

  // Copy grid
  let previousGrid = JSON.parse(JSON.stringify(grid)) as Seat[][]
  let currentGrid = JSON.parse(JSON.stringify(grid)) as Seat[][]

  // Init counters
  let previousOccupiedCount = -1
  let currentOccupiedCount = 0

  // Simulate
  while (previousOccupiedCount !== currentOccupiedCount) {
    // Reset count
    previousOccupiedCount = currentOccupiedCount
    currentOccupiedCount = 0

    for (let row = 0; row < previousGrid.length; ++row) {
      for (let col = 0; col < previousGrid[row].length; ++col) {

        const seat = previousGrid[row][col];
        if (seat === FLOOR) continue;

        const directions =
          raycastEightDirections(previousGrid, row, col, 1, FLOOR)

        const fourOrMoreDirectionsOccupied = directions
          .reduce((acc:number, direction: Seat) => acc + isOccupied(direction), 0) >= 4

        // # Rule: If four or more directions are OCCUPIED, the seat becomes EMPTY
        if (fourOrMoreDirectionsOccupied) {
          currentGrid[row][col] = EMPTY
          continue
        }

        const everyDirectionNotOccupied = directions
          .every((direction: Seat) => !isOccupied(direction))

        // # Rule: If every direction is NOT OCCUPIED, the seat becomes OCCUPIED
        if (everyDirectionNotOccupied) {
          currentOccupiedCount++;
          currentGrid[row][col] = OCCUPIED
          continue
        }

        if (currentGrid[row][col] === OCCUPIED) {
          currentOccupiedCount++;
        }
      }
    }

    // Copy grid
    previousGrid = currentGrid
    currentGrid = JSON.parse(JSON.stringify(currentGrid))
  }

  console.log(`${currentOccupiedCount}`)
}
//
// --- part 2 ---
//
{
  // Copy grid
  let previousGrid = JSON.parse(JSON.stringify(grid)) as Seat[][]
  let currentGrid = JSON.parse(JSON.stringify(grid)) as Seat[][]

  // Init counters
  let previousOccupiedCount = -1
  let currentOccupiedCount = 0

  // Simulate
  while (previousOccupiedCount !== currentOccupiedCount) {

    // Reset count
    previousOccupiedCount = currentOccupiedCount
    currentOccupiedCount = 0

    for (let row = 0; row < previousGrid.length; ++row) {
      for (let col = 0; col < previousGrid[row].length; ++col) {

        const seat = previousGrid[row][col];
        if (seat === FLOOR) continue;

        const rayLimit = Math.max(row+1, col+1, grid.length - row, grid[row].length - col)

        const directions =
          raycastEightDirections(previousGrid, row, col, rayLimit, FLOOR)

        const fiveOrMoreDirectionsOccupied = directions
          .reduce((acc, dir) => acc + isOccupied(dir), 0) >= 5

        // # Rule: If five or more directions are OCCUPIED, the seat becomes EMPTY
        if (fiveOrMoreDirectionsOccupied) {
          currentGrid[row][col] = EMPTY
          continue
        }

        const everyDirectionNotOccupied = directions
          .every((direction) => !isOccupied(direction))

        // # Rule: If every direction is NOT OCCUPIED, the seat becomes OCCUPIED
        if (everyDirectionNotOccupied) {
          currentOccupiedCount++;
          currentGrid[row][col] = OCCUPIED
          continue
        }

        if (currentGrid[row][col] === OCCUPIED) {
          currentOccupiedCount++;
        }
      }
    }

    // Copy grid
    previousGrid = currentGrid
    currentGrid = JSON.parse(JSON.stringify(currentGrid))
  }

  console.log(`${currentOccupiedCount}`)
}
