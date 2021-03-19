const fs = require("fs");
const path = "./tasks.json";

function searchUser(username) {
  if (fs.existsSync(path)) {
    const rawData = fs.readFileSync(path);
    let tasks = JSON.parse(rawData);

    for (const task of tasks.tasks) {
      if (username === task.user) {
        console.log(username);
        return true;
      } else {
        console.log("Your username does not seem to exist. Let's create your first task.");
        break;
      }
    }
  } else {
    console.log("Your username does not seem to exist. Let's create your first task.")
  }
}

module.exports = searchUser;
