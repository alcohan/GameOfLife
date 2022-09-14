function make2DArray(cols, rows) {
    // console.log(`Making array ${cols} x ${rows}`);
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  function newCell(cycleCount) {
    return new Cell(cycleCount);
  }
  
  function countNeighbors(grid, x, y) {
    let count = 0;
  
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i != 0 || j != 0) {
          try {
            if (grid[i + x][j + y]) count++;
          } catch (TypeError) {
            //do nothing
          }
        }
      }
    }
    return count;
  }
  
  function nextState(grid, cycle) {
    let next = make2DArray(cols, rows);
  
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let n = countNeighbors(grid, x, y);
  
        //if the cell is alive
        if (grid[x][y]) {
          //if fewer than two neighbors, die
          if (n < 2) next[x][y] = 0;
          //if two or three neighbors, remain alive
          if (n === 2 || n === 3) next[x][y] = grid[x][y];
          //if more than three neighbors, die
          if (n > 3) next[x][y] = 0;
        } else {
          //else the cell is dead
          //if three neighbors, come alive
          if (n === 3) next[x][y] = newCell(cycle);
          //otherwise stay dead
          else next[x][y] = 0;
        }
      }
    }
    return next;
  }
  
  function getRandomGrid(density, cols, rows) {
    grid = make2DArray(cols, rows);
    console.log("randomizing with density ", density);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // let status = floor(random(10*density));
        if (random() < density) grid[i][j] = new Cell(0);
        else grid[i][j] = 0;
      }
    }
    return grid;
  }
  
  class GameOfLife {
    constructor(cols, rows) {
      this.age = 0;
      cols = cols;
      rows = rows;
  
      this.grid = getRandomGrid(0.5, cols, rows);
    }
  
    randomize(density = 0.5) {
      this.grid = getRandomGrid(density, cols, rows);
    }
  
    clear() {
      this.grid = make2DArray(cols, rows);
    }
  
    step() {
      this.grid = nextState(this.grid, this.age);
      this.age++;
    }
  
    flipCell(col, row) {
      let thisCell = this.grid[col][row];
      if (thisCell) this.grid[col][row] = 0;
      else this.grid[col][row] = newCell(this.age);
    }
    setLivingCell(col, row) {
      this.grid[col][row] = newCell(this.age);
    }
  
    draw(cellWidth) {
      background(0);
      stroke(0);
  
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (this.grid[i][j]) {
            fill(this.grid[i][j].getFillColor(this.age));
            rect(i * cellWidth, j * cellWidth, cellWidth, cellWidth);
          }
        }
      }
    }
  }
  