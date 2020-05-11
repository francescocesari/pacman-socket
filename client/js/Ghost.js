class Ghost extends Character {
  constructor(x, y, width, height, maze) {
    super(x, y, width, height, maze);
  }

  catch(pacMan) {
    if (
      pacMan.x >= this.x - 14 &&
      pacMan.x <= this.x + 14 &&
      pacMan.y >= this.y - 14 &&
      pacMan.y <= this.y + 14
    ) {
      this.socket.emit("pacDeath", { id: this.socket.id });
    }
  }
}
