import {useListMain, listTasks, oneTask} from './listar.js';
import { archivo, useCreateMain} from './crear.js'
import {useUpdateMain} from './actualizar.js'
import {deleteTask} from './borrar.js'
import {searchUser} from './buscarUsuario.js'

import readline from 'readline-sync';

function initialPrompt() {
  const actions = ["Create", "Update", "Delete", "List all", "List specific"];
  const index = readline.keyInSelect(actions, "Select your action:");

  return actions[index];
}

function main() {
  console.log("Welcome to the TO-DO list app!\n");

  const username = readline.question("What is your username? ");

  const searchUsername = searchUser(username);
  let action = "";

  if (searchUsername) {
    console.log(`\nHello again, ${username}!\n`);

    console.log("These are your current tasks:")
    useListMain(archivo, username, true);

    action = initialPrompt();

  } else {
    console.log(`\nHello ${username}, lets create a new task! \n`)
    action = "Create";
  }


  let makingTasks = true;

  while (makingTasks) {
    switch (action) {
      case "Create":
        useCreateMain(archivo, username);

        action = initialPrompt();
        break;

      case "Update":
        useUpdateMain(archivo, username);

        action = initialPrompt();
        break;

      case "Delete":

        deleteTask(archivo, username);
        action = initialPrompt();
        break;

      case "List all":

        useListMain(archivo, username, true);
        action = initialPrompt();
        break;

      case "List specific":

        oneTask(archivo, username);
        action = initialPrompt();
        break;

      default:
        makingTasks = false;
        console.log("Goodbye!");
        break;
    }
  }
}

main();
