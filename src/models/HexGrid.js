import HexCell from './HexCell';

export default class HexGrid {
  constructor(size = 3) {
    this.size = size;
    this.diameter = (this.size * 2) - 1;
    this.grid = new Array(this.diameter);
    this.list = [];
    this.solution = [];

    this.createGrid();
    this.createSolution();
  }

  get cellCount() {
    return this.list.length;
  }

  createSolution() {
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * this.cellCount);
      while (this.solution.includes(randomIndex + 1)) {
        randomIndex = Math.floor(Math.random() * this.cellCount);
      }
      this.list[randomIndex].setActive(!this.list[randomIndex].active);
      this.solution.push(randomIndex + 1);
    }
  }

  createGrid() {
    let index = 0;
    let cellCount = this.size;
    while (index < this.diameter) {
      this.createRow(index, cellCount);
      index += 1;
      if (index < this.size) {
        cellCount += 1;
      } else {
        cellCount -= 1;
      }
    }
  }

  createRow(index, cellCount) {
    const row = new Array(cellCount);
    this.grid[index] = row;
    for (let i = 0; i < cellCount; i += 1) {
      const cell = new HexCell();
      this.list.push(cell);
      cell.y = (index + 1) - this.size;
      const xOffset = index >= this.size ? index + 1 - this.size : 0;
      cell.x = (i + this.size - xOffset) - cellCount;
      cell.value = this.list.length;
      row[i] = cell;
      if (i > 0) {
        row[i - 1].setNeighbor(HexCell.Directions.East, cell);
      }
      if (index > 0) {
        let northWest = i;
        let northEast = i + 1;
        if (index < this.size) {
          northWest = i - 1;
          northEast = i;
        }
        if (this.grid[index - 1][northWest]) {
          this.grid[index - 1][northWest].setNeighbor(HexCell.Directions.SouthEast, cell);
        }
        if (this.grid[index - 1][northEast]) {
          this.grid[index - 1][northEast].setNeighbor(HexCell.Directions.SouthWest, cell);
        }
      }
    }
  }
}
