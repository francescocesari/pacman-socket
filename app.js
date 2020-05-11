const express = require("express");
const app = express();
const serv = require("http").Server(app);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  setUserCharacter,
} = require("./users.js");

const PORT = process.env.PORT || 2000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/game", function (req, res) {
  res.sendFile(__dirname + "/client/game.html");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

const Maze = require("./server/classes/Maze.js");
var maze = new Maze();

var io = require("socket.io")(serv);
io.of("/game").on("connection", (socket) => {
  socket.on("disconnect", () => removeUser(socket.id));

  socket.on("join", ({ name, room }, callback) => {
    if (getUsersInRoom(room).length < 3) {
      var { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to the room ${user.room}`,
      });

      socket
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name}, has joined!` });

      socket.join(user.room);
      console.log(`${user.name} has joined ${user.room}`);
    } else {
      callback("Sorry but this room is full at the moment");
    }
  });

  socket.on("character", (character, callback) => {
    var user = getUser(socket.id);
    if (user.character === undefined) {
      var users = getUsersInRoom(user.room);
      var getUserCharacter = (character) =>
        users.filter((user) => user.character === character);
      if (getUserCharacter(character) == "") {
        setUserCharacter({ id: socket.id, character });
        var usersCharacters = () =>
          users.filter((user) => user.character !== undefined);
        if (usersCharacters().length === 3) {
          callback();
          io.of("/game").to(user.room).emit("start", maze);
          console.log(`GAME STARTED in room: ${user.room}`);
        } else callback();
      } else {
        callback("Character already taken");
      }
    } else callback("You already select one character");
  });

  socket.on("position", (data) => {
    var user = getUser(data.id);
    socket.to(user.room).emit("position", data);
  });

  socket.on("eat", ({ id, i, j }) => {
    var user = getUser(id);
    maze.matrix[i][j].value = -1;
    socket.to(user.room).emit("eat", { id, i, j });
  });

  socket.on("pacDeath", ({ id }) => {
    var user = getUser(id);
    io.of("/game").to(user.room).emit("pacDeath", id);
    console.log("DEATH");
  });
});
