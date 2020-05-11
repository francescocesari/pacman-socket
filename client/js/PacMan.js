class PacMan extends Character {
  constructor(x, y, width, height, maze) {
    super(x, y, width, height, maze);
  }

  eat() {
    for (let i = 3; i < this.maze.tileRowNumber - 2; i++) {
      for (let j = 0; j < this.maze.tileColumnNumber; j++) {
        let tile = this.maze.matrix[i][j];
        let x = this.x;
        let y = this.y;
        if (tile.x === x && tile.y === y && tile.value === 0) {
          this.maze.matrix[i][j].value = -1;
          this.socket.emit("eat", { i: i, j: j });
          return true;
        }
      }
    }
  }
}
