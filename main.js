const rls = require("readline-sync");
const actualizar = require("./actualizar");
const crear = require("./crear");
const listar = require("./listar");
const borrar1 = require("./borrar1");

let appOn = true;

function initialPrompt() {
  const actions = ["Create", "Update", "Delete", "List all", "List specific"];
  const index = rls.keyInSelect(actions, "Select your action:");

  return actions[index];
}

console.log("Welcome to the TO-DO list app!\n");

while (appOn) {
  const username = rls.question("What is your username? ");

  // Function search for username.
  const searchUsername = true;

  if (searchUsername) {
    console.log(`\nHi ${username}!\n`);
  } else {
    console.log("\nUsername not found. Please, try again.\n");
    continue;
  }

  // Execute function listar().
  console.log("These are your current tasks:")

  let action = initialPrompt();

  switch (action) {
    case "Create":
      console.log("Hello from create");
      crear.useCreateMain(crear.archivo, username, "description");
      // Execute create();
      break;

    case "Update":
      console.log("Hello from update");
      actualizar.useUpdateMain();
      // Execute update(task_id);
      break;

    case "Delete":
      console.log("Hello from delete");
      borrar1.deleteTask();
      // Execute delete(task_id);
      break;

    case "list":
      console.log("Hello from list all");
      listar.list_all();
      // Execute list_all();
      break;

    case "List specific":
      console.log("Hello from list specific");
      // Execute list();
      break;

    default:
      console.log("Goodbye!");
      break;
  }

  appOn = false;
}
