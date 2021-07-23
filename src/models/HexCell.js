export default class HexCell {
  constructor(value = 0) {
    this.x = 0;
    this.y = 0;
    this.neighbors = new Array(6);
    this.value = value;
    this.active = false;

    return this;
  }

  setActive(active = false, applyNeighbor = true) {
    this.active = active;
    this.neighbors.forEach((neighbor) => {
      if (neighbor && applyNeighbor) {
        neighbor.setActive(!neighbor.active, false);
      }
    });
  }

  get coordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get code() {
    const neighborsReduced = this.neighbors
      .map((neighbor) => neighbor.value)
      .reduce((accumulator, current) => current + accumulator, 0);
    return this.value + neighborsReduced;
  }

  setNeighbor(direction = HexCell.Directions.NorthWest, hexCell, setSelf = true) {
    const opposite = HexCell.getOppositeDirection(direction);
    this.neighbors[direction] = hexCell;
    if (setSelf) {
      hexCell.setNeighbor(opposite, this, false);
    }
  }

  getNeighbor(direction = HexCell.Directions.NorthWest) {
    return this.neighbors[direction];
  }

  static getOppositeDirection(direction = HexCell.Directions.NorthWest) {
    return direction < 3 ? Math.abs(3 + direction) : Math.abs(3 - direction);
  }

  static Directions = {
    NorthWest: 0,
    NorthEast: 1,
    East: 2,
    SouthEast: 3,
    SouthWest: 4,
    West: 5,
  }
}
