class Maze {
  constructor(maze) {
    this.matrix = maze.matrix;
    this.tileColumnNumber = maze.tileColumnNumber;
    this.tileRowNumber = maze.tileRowNumber;
    this.tileWidth = maze.tileWidth;
    this.tileHeight = maze.tileHeight;
    this.width = this.tileWidth * this.tileColumnNumber;
    this.height = this.tileHeight * this.tileRowNumber;
  }

  showGrid() {
    this.ctx.strokeStyle = "#fff";
    for (let i = 0; i < this.tileRowNumber; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        this.strokeRect(
          this.matrix[i][j].x,
          this.matrix[i][j].y,
          this.tileWidth,
          this.tileHeight
        );
      }
    }
  }

  show() {
    this.ctx.fillStyle = "#201e00";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.showWalls();
    this.showPellets();
  }

  showWalls() {
    this.ctx.fillStyle = "#1919a6";
    for (let i = 0; i < this.tileRowNumber; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        var x = this.matrix[i][j].x;
        var y = this.matrix[i][j].y;
        var width = this.tileWidth;
        var height = this.tileHeight;
        var rectPadding = 4;
        var rectRadius = 5;
        switch (this.matrix[i][j].value) {
          case 1:
            this.ctx.fillRect(x, y, width, rectPadding);
            break;
          case 2:
            this.ctx.fillRect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 3:
            this.ctx.fillRect(x, y, rectPadding, height);
            break;
          case 4:
            this.ctx.fillRect(x + width - rectPadding, y, rectPadding, height);
            break;
          case 5:
            this.ctx.fillRect(x, y, width, rectPadding);
            this.ctx.fillRect(x, y, rectPadding, height);
            break;
          case 6:
            this.ctx.fillRect(x, y, width, rectPadding);
            this.ctx.fillRect(x + width - rectPadding, y, rectPadding, height);
            break;
          case 7:
            this.ctx.fillRect(x, y, rectPadding, height);
            this.ctx.fillRect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 8:
            this.ctx.fillRect(x + width - rectPadding, y, rectPadding, height);
            this.ctx.fillRect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 9:
            this.ctx.fillRect(x, y, rectPadding, rectPadding);
            break;
          case 10:
            this.ctx.fillRect(
              x + width - rectPadding,
              y,
              rectPadding,
              rectPadding
            );
            break;
          case 11:
            this.ctx.fillRect(
              x,
              y + height - rectPadding,
              rectPadding,
              rectPadding,
              0
            );
            break;
          case 12:
            this.ctx.fillRect(
              x + width - rectPadding,
              y + height - rectPadding,
              rectPadding,
              rectPadding
            );
            break;
        }
      }
    }
  }

  showPellets() {
    this.ctx.fillStyle = "#fff000";
    for (let i = 3; i < this.tileRowNumber - 2; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        if (this.matrix[i][j].value === 0) {
          this.circle(
            this.matrix[i][j].x + this.tileWidth / 2,
            this.matrix[i][j].y + this.tileWidth / 2,
            this.tileWidth / 4
          );
          this.ctx.fill();
        }
      }
    }
  }

  circle(x, y, diam) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, diam / 2, 0, 2 * Math.PI);
  }

  countPellets() {
    this.pelletsNumber = 0;
    for (let i = 3; i < this.tileRowNumber - 2; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        if (this.matrix[i][j].value === 0) {
          this.pelletsNumber++;
        }
      }
    }
  }
}
