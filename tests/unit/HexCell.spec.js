import HexCell from '../../src/models/HexCell';

const MAX_HEX_SIDES = 6;
const SAMPLE_HEX_VALUE = 5;

describe('HexCell', () => {
  let hexCell;
  let neighbor;
  const directions = Object.keys(HexCell.Directions);
  beforeEach(() => {
    hexCell = new HexCell(SAMPLE_HEX_VALUE);
    neighbor = new HexCell(SAMPLE_HEX_VALUE);
    directions.forEach((direction, index) => {
      expect(HexCell.Directions[direction]).toBe(index);
    });
  });

  it('has 6 different directions and each direction matches a their index', () => {
    expect(directions.length).toBe(MAX_HEX_SIDES);
    directions.forEach((direction, index) => {
      expect(HexCell.Directions[direction]).toBe(index);
    });
  });

  it('can get an opposite direction', () => {
    directions.forEach((direction) => {
      const opposite = HexCell.getOppositeDirection(HexCell.Directions[direction]);
      expect(Math.abs(HexCell.Directions[direction] - opposite)).toBe(MAX_HEX_SIDES / 2);
    });
  });

  it('has x and y coordinates', () => {
    expect(hexCell.coordinates.x).toBeDefined();
    expect(hexCell.coordinates.y).toBeDefined();
  });

  it('has an array of neighbors', () => {
    expect(hexCell.neighbors.length).toBe(MAX_HEX_SIDES);
  });

  it('can have a value', () => {
    expect(hexCell.value).toBe(SAMPLE_HEX_VALUE);
  });

  it('can set and get its neighbor', () => {
    hexCell.setNeighbor(HexCell.Directions.East, neighbor);
    expect(hexCell.getNeighbor(HexCell.Directions.East)).toBe(neighbor);
    expect(neighbor.getNeighbor(HexCell.Directions.West)).toBe(hexCell);
  });

  it('can calculate the code', () => {
    directions.forEach((direction) => {
      hexCell.setNeighbor(HexCell.Directions[direction], new HexCell(SAMPLE_HEX_VALUE));
    });
    expect(hexCell.code).toBe(SAMPLE_HEX_VALUE * (MAX_HEX_SIDES + 1));
  });
});
