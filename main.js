import User from "./classes/user.js";
import Task from "./classes/task.js";
import utils from "./utils/utils.js";

import readline from 'readline-sync';
import fs from 'fs';
import pt from "path";

const path = pt.join("./jsonDB/tasks.json");
const makefolder = pt.join("./jsonDB");

function showAvailableActions() {
  const actions = ["Create", "Update", "Delete", "List all", "List specific"];
  const index = readline.keyInSelect(actions, "Select your action:");

  return actions[index];
}

function main() {
  console.log("Welcome to the TO-DO list app!\n");

  let user = new User(readline.question("What is your username? "));

  // Create folder if it does not exist.
  if (!fs.existsSync(makefolder)){
      fs.mkdirSync(makefolder);
  }

  // Check if there is something wrong with the json file.
  if (!fs.existsSync(path) || utils.isJsonEmptyOrMalformed(path)) {
    fs.writeFileSync(path, JSON.stringify({ "tasks": [] }, null, 4));
  }

  let action = "";

  user.getOwnTasks(path);

  // Different greetings depending on whether the user has tasks or not.  
  if (user.ownTasks.length) {
    console.log(`\nHello again, ${user.username}!\n`);

    console.log("These are your current tasks:");
    user.listAllTasks();

  // If they don't, force them to choose Create.
  } else {
    console.log(`\nThis is your first time here, ${user.username}. Let's create a new task! \n`);
    action = "Create";
  }

  let makingTasks = true;

  while (makingTasks) {    
    // New user must choose Create. 
    // When the loop restarts, the user will have a task and will be able to choose an action.
    if (user.ownTasks.length) {
      action = showAvailableActions();

      // Refresh tasks so that newly created tasks appear.
      user.getOwnTasks(path);
    }

    switch (action) {
      case "Create":
        // Where to write in the json.
        user.getMaxId(path);

        user.currentTask = new Task(user, user.maxIdOfTask);

        user.writeCurrentTask(path);
        user.showCurrentTask();

        break;

      case "Update":
        user.askForId();
        user.updateTask(path);

        break;

      case "Delete":
        user.askForId();
        user.deleteTask(path);

        break;

      case "List all":
        user.listAllTasks();

        break;

      case "List specific":
        user.askForId();
        user.listOneTask();

        break;

      default:
        makingTasks = false;
        console.log("Goodbye!");

        break;
    }
  }
}

main();
