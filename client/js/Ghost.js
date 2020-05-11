class Ghost extends Character {
  constructor(x, y, width, height, maze, socket) {
    super(x, y, width, height, maze, socket);
    this.color = color;
  }

  draw() {
    if (this.name === "blinky") fill(color("#fd0000"));
    else fill(color("#ffb8ff"));
    rect(this.x, this.y, this.width, this.height);
  }

  catch(pacMan) {
    if (
      pacMan.x >= this.x - 14 &&
      pacMan.x <= this.x + 14 &&
      pacMan.y >= this.y - 14 &&
      pacMan.y <= this.y + 14
    ) {
      this.socket.emit("pacDeath", true);
    }
  }
}
