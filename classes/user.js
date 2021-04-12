import utils from "../utils/utils.js";
import fs from "fs";
import readline from 'readline-sync';

class User {
    constructor(username) {
        this.username = username;
        this.ownTasks = [];
        this.maxIdOfTask = 0;
        this.currentTask = "";
        this.askedId = 0;
    }
    
    askForId() {
        this.askedId = Number(
            readline.question("Which id? ", { limit: /^\d+$/, 
                limitMessage: "Please, input an integer." })
            );
    }

    deleteTask(path) {
        const removeIndex = this.ownTasks.map(
            function(item) {
                return item.id;
            }
        ).indexOf(this.askedId);

        if (removeIndex === -1) {
            console.log("Could not find the id, please check the ids of your tasks.")

            return;
        }

        this.ownTasks.splice(removeIndex, 1);
        
        fs.writeFileSync(path, JSON.stringify({ "tasks": this.ownTasks }, null, 4));
    }

    // Find where we can insert the new task in the Json file.
    getMaxId(path) {
        const allTasks = utils.readAndParseAllTasks(path);

        for (const task of allTasks.tasks) {
            // Obtain maxId in Json.
            if (task.id >= this.maxIdOfTask) {
                this.maxIdOfTask = task.id;
            }
        }

        this.maxIdOfTask += 1;
    }

    getOwnTasks(path) {
        // Reinitialize ownTasks since this can push tasks that are there.
        this.ownTasks = [];
        const allTasks = utils.readAndParseAllTasks(path);
        
        for (const task of allTasks.tasks) {
            if (this.username === task.username) {
                this.ownTasks.push(task);
            }
        }
    }
    
    listAllTasks() {
        console.log(this.ownTasks);
    }

    showCurrentTask() {
        console.log("\nAdded task:\n");
        console.log(this.currentTask);
    }

    updateTask(path) {
        for (const task of this.ownTasks) {
            if (task.id === id) {
                this.currentTask = task;
                break;
            }
        }

        this.deleteTask(path);

        // desc, dstart, dend, status.

        this.currentTask.description = readline.question("Previous ") 

    }

    writeCurrentTask(path) {
        const allTasks = utils.readAndParseAllTasks(path);

        allTasks.tasks.push(this.currentTask);

        fs.writeFileSync(path, JSON.stringify(allTasks, null, 4));
    }
}

export default User;