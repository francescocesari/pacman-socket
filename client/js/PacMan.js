class PacMan extends Character {
  constructor(x, y, width, height, maze, socket) {
    super(x, y, width, height, maze, socket);
    this.name = "pacman";
    this.upperMouthRadian = 1.85; // upper mouth radian
    this.lowerMouthRadian = 0.2; // lower mouth radian
    this.openingClosingMouthSpeed = 0.022; // speed of mouth opening & closing
    this.alive = true;
    this.score = 0;
    keyCode = null;
    this.socket = socket;
  }

  draw() {
    fill(255, 255, 0);
    ellipse(
      this.x + this.width / 2 - 2.5,
      this.y + this.height / 2 - 2.5,
      this.width,
      this.height
    );
    fill(0);
    if (this.upperMouthRadian >= 2 || this.upperMouthRadian <= 1.8) {
      this.openingClosingMouthSpeed = this.openingClosingMouthSpeed * -1;
    }
    let angle;
    switch (this.dir) {
      case 1:
        angle = 177;
        break;
      case 2:
        angle = 267;
        break;
      case 3:
        angle = -3;
        break;
      case 4:
        angle = 87;
        break;
      default:
        angle = 177;
        break;
    }
    arc(
      this.x + this.width / 2 - 2.5,
      this.y + this.height / 2 - 2.5,
      this.width,
      this.height,
      (this.upperMouthRadian += this.openingClosingMouthSpeed) * PI +
        radians(angle),
      (this.lowerMouthRadian -= this.openingClosingMouthSpeed) * PI +
        radians(angle)
    );
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

  deathAnimation() {
    fill(255, 255, 0);
    ellipse(
      this.x + this.width / 2 - 2.5,
      this.y + this.height / 2 - 2.5,
      this.width,
      this.height
    );
    fill(0);
  }
}
