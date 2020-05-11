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
    stroke(150);
    fill(0);
    for (let i = 0; i < this.tileRowNumber; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        square(this.matrix[i][j].x, this.matrix[i][j].y, this.tileWidth);
      }
    }
  }

  showWalls() {
    fill(color("#1919a6"));
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
            rect(x, y, width, rectPadding);
            break;
          case 2:
            rect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 3:
            rect(x, y, rectPadding, height);
            break;
          case 4:
            rect(x + width - rectPadding, y, rectPadding, height);
            break;
          case 5:
            rect(x, y, width, rectPadding);
            rect(x, y, rectPadding, height);
            break;
          case 6:
            rect(x, y, width, rectPadding);
            rect(x + width - rectPadding, y, rectPadding, height);
            break;
          case 7:
            rect(x, y, rectPadding, height);
            rect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 8:
            rect(x + width - rectPadding, y, rectPadding, height);
            rect(x, y + height - rectPadding, width, rectPadding);
            break;
          case 9:
            rect(x, y, rectPadding, rectPadding, 0, 0, rectRadius, 0);
            break;
          case 10:
            rect(
              x + width - rectPadding,
              y,
              rectPadding,
              rectPadding,
              0,
              0,
              0,
              rectRadius
            );
            break;
          case 11:
            rect(
              x,
              y + height - rectPadding,
              rectPadding,
              rectPadding,
              0,
              rectRadius,
              0,
              0
            );
            break;
          case 12:
            rect(
              x + width - rectPadding,
              y + height - rectPadding,
              rectPadding,
              rectPadding,
              rectRadius,
              0,
              0,
              0
            );
            break;
        }
      }
    }
  }

  showPellets() {
    fill(color("#fff000"));
    noStroke();
    for (let i = 3; i < this.tileRowNumber - 2; i++) {
      for (let j = 0; j < this.tileColumnNumber; j++) {
        if (this.matrix[i][j].value === 0) {
          circle(
            this.matrix[i][j].x + this.tileWidth / 2,
            this.matrix[i][j].y + this.tileWidth / 2,
            this.tileWidth / 4
          );
        }
      }
    }
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
