class Character {
  constructor(x, y, width, height, maze, socket) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.maze = maze;
    this.dir = -1;
    this.nextDir = this.dir;
    this.state = "STOP";
    this.speed = 1.875;
    this.prevState;
    this.socket = socket;
  }

  stop() {
    this.state = "STOP";
  }

  setDir(dir) {
    this.nextDir = dir;
  }

  showTile() {
    fill(255, 0, 0);
    stroke(76);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.prevState = this.state;
    this.state = "MOVE";
    let tile = this.checkDir(this.nextDir);
    if (tile !== undefined) {
      if (this.dir === this.nextDir) {
        this.stop();
      } else {
        if (this.prevState === "STOP") {
          this.stop();
        }
      }
    } else if (this.nextDir === -1) {
      this.stop();
    } else {
      this.prevDir = this.dir;
      this.dir = this.nextDir;
    }

    if (this.checkDir(this.dir) !== undefined) this.stop();

    if (this.state === "MOVE") {
      switch (this.dir) {
        case 1:
          this.x -= this.speed;
          break;
        case 2:
          this.y -= this.speed;
          break;
        case 3:
          this.x += this.speed;
          break;
        case 4:
          this.y += this.speed;
          break;
      }
      this.update();
    }

    if (this.x < -5) {
      this.x = 405;
    } else if (this.x > 405) {
      this.x = 0;
    }
    //this.draw();
  }

  update() {
    socket.emit("position", {
      characterName: this.name,
      x: this.x,
      y: this.y,
      key: this.key,
      dir: this.dir,
    });
  }

  checkDir(dir) {
    for (let i = 3; i < this.maze.tileRowNumber - 2; i++) {
      for (let j = 0; j < this.maze.tileColumnNumber; j++) {
        let tile = this.maze.matrix[i][j];
        let collision = false;
        let x = this.x;
        let y = this.y;
        var mainCondition =
          (this.name === "pacman" && tile.value !== 0 && tile.value !== -1) ||
          (this.name !== "pacman" &&
            tile.value !== 0 &&
            tile.value !== -1 &&
            tile.value !== -2);
        switch (dir) {
          case 1:
            x -= this.maze.tileWidth;
            if (mainCondition) {
              collision =
                x === tile.x &&
                y > tile.y - this.maze.tileHeight &&
                y <= tile.y;
            } else {
              collision =
                x === tile.x && y > tile.y - this.maze.tileHeight && y < tile.y;
            }
            break;
          case 2:
            y -= this.maze.tileHeight;
            if (mainCondition) {
              collision =
                y === tile.y && x > tile.x - this.maze.tileWidth && x <= tile.x;
            } else {
              collision =
                tile.y === y && x > tile.x - this.maze.tileWidth && x < tile.x;
            }
            break;
          case 3:
            x += this.maze.tileWidth;
            if (mainCondition) {
              collision =
                x === tile.x &&
                y > tile.y - this.maze.tileHeight &&
                y <= tile.y;
            } else {
              collision =
                x === tile.x && y > tile.y - this.maze.tileHeight && y < tile.y;
            }
            break;
          case 4:
            y += this.maze.tileHeight;
            if (mainCondition) {
              collision =
                y === tile.y && x > tile.x - this.maze.tileWidth && x <= tile.x;
            } else {
              collision =
                y === tile.y && x > tile.x - this.maze.tileWidth && x < tile.x;
            }
            break;
        }
        if (collision) return tile;
      }
    }
  }
}
