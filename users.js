var users = [];

const addUser = ({ id, name, room }) => {
  var name = name.trim().toLowerCase();
  var room = room.trim().toLowerCase();

  var existingUser = users.find((user) => {
    return user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Username is already taken" };
  }

  var user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  var index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const setUserCharacter = ({ id, character }) => {
  for (var i in users) {
    if (users[i].id === id) {
      users[i].character = character;
      return users[i];
    }
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  setUserCharacter,
};
