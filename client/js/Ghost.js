class Ghost extends Character {
  constructor(x, y, width, height, maze, socket, color) {
    super(x, y, width, height, maze, socket);
    this.alive = true;
    this.color = color;
    this.socket = socket;
  }

  draw() {
    fill(this.color);
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
