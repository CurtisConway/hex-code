import HexGrid from '../../src/models/HexGrid';

describe('HexGrid', () => {
  let grid;
  beforeEach(() => {
    grid = new HexGrid();
  });

  it('can create a grid with a size and diameter', () => {
    expect(grid.size).toBe(3);
    expect(grid.diameter).toBe(5);
    expect(grid.grid.length).toBe(grid.diameter);
  });
});
