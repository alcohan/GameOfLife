class Cell {
    constructor(createdAt) {
      this.createdAt=createdAt;
    }
    
    getFillColor(cycleCount) {
      return color('magenta');
    }
  }