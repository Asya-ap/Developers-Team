const rls = require("readline-sync");

let appOn = true;

while (appOn) {
    const username = rls.question("Welcome to the TO-DO list app!\nWhat is your username?\n");
    console.log(`Hi ${username}!`);

    appOn = false;
}
