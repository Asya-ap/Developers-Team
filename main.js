const rls = require("readline-sync");
const actualizar = require("./actualizar");
const crear = require("./crear");
const buscarUsuario = require("./buscarUsuario.js");
const listar = require("./listar");
const borrar = require("./borrar");


function initialPrompt() {
  const actions = ["Create", "Update", "Delete", "List all", "List specific"];
  const index = rls.keyInSelect(actions, "Select your action:");

  return actions[index];
}

function main() {
  console.log("Welcome to the TO-DO list app!\n");

  const username = rls.question("What is your username? ");

  const searchUsername = buscarUsuario.searchUser(username);
  let action = "";

  if (searchUsername) {
    console.log(`\nHello again, ${username}!\n`);

    console.log("These are your current tasks:")
    // Execute function listar().

    action = initialPrompt();

  } else {
    action = "Create";
    action = "Delete";
  }


  let makingTasks = true;

  while (makingTasks) {
    switch (action) {
      case "Create":
        crear.useCreateMain(crear.archivo, username);

        action = initialPrompt();
        break;

      case "Update":
        actualizar.useUpdateMain(crear.archivo, username);

        action = initialPrompt();
        break;

      case "Delete":
        borrar.deleteTask(borrar.archivo);

        action = initialPrompt();
        break;

      case "List all":
        listar.tasksList();

        action = initialPrompt();
        break;

      case "List specific":


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
