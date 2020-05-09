const express = require("express");
const app = express();
const serv = require("http").Server(app);

const PORT = process.env.PORT || 2000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

serv.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

const Maze = require("./server/classes/Maze.js");
var maze = new Maze();
var socketsCharacterList = [];

var io = require("socket.io")(serv);
io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("Socket connection: " + socket.id);
  if (socketsCharacterList.length >= 3) {
    socket.disconnect();
    console.log("disconnected: " + socket.id);
  }
  socket.emit("startMaze", maze);

  socket.on("characterName", function (characterName) {
    if (
      characterName === "pacman" &&
      !socketsCharacterList.includes(socket.id) &&
      socketsCharacterList[0] == undefined
    ) {
      socketsCharacterList[0] = socket.id;
      socket.emit("characterName", { characterName: characterName, key: 0 });
    } else if (
      characterName === "blinky" &&
      !socketsCharacterList.includes(socket.id) &&
      socketsCharacterList[1] == undefined
    ) {
      socketsCharacterList[1] = socket.id;
      socket.emit("characterName", { characterName: characterName, key: 1 });
    } else if (
      characterName === "pinky" &&
      !socketsCharacterList.includes(socket.id) &&
      socketsCharacterList[2] == undefined
    ) {
      socketsCharacterList[2] = socket.id;
      socket.emit("characterName", { characterName: characterName, key: 2 });
    } else {
      socket.emit("characterName", "ALREADY_SELECTED");
    }
    var start =
      socketsCharacterList[0] != undefined &&
      socketsCharacterList[1] != undefined &&
      socketsCharacterList[2] != undefined;
    if (start) io.sockets.emit("start", start);
  });

  socket.on("position", function (data) {
    socket.broadcast.emit("position", data);
    console.log(data);
  });

  socket.on("eat", function (data) {
    maze.matrix[data.i][data.j] = -1;
    socket.broadcast.emit("eat", data);
  });

  socket.on("pacDeath", function (data) {
    console.log("DEATH");
  });
}
