const rls = require("readline-sync");

let appOn = true;

function initialPrompt() {
  const actions = ["Create", "Update", "Delete", "List all", "List specific"]
  const index = rls.keyInSelect(actions, "Select your action:")

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

  console.log("These are your current tasks:")

  // Execute function listar().
  action = initialPrompt();

  switch (action) {
    case "Create":
      console.log("Hello from create");
      break;

    case "Update":
      console.log("Hello from update");
      break;

    case "Delete":
      console.log("Hello from delete");
      break;

    case "List all":
      console.log("Hello from list all");
      break;

    case "List specific":
      console.log("Hello from list specific");
      break;

    default:
      console.log("Goodbye!");
      break;
  }

  appOn = false;
}
