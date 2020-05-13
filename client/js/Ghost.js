class Ghost extends Character {
  constructor(x, y, width, height, maze) {
    super(x, y, width, height, maze);
  }

  catch(pacMan) {
    if (pacMan.x === this.x && pacMan.y === this.y) {
      this.socket.emit("pacDeath", { id: this.socket.id });
    }
  }
}
