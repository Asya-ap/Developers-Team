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
            readline.question("\nWhich id? ", { limit: /^\d+$/, 
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
            console.log("\nCould not find the id, please check the ids of your tasks.")

            return false;
        }

        this.ownTasks.splice(removeIndex, 1);
        
        fs.writeFileSync(path, JSON.stringify({ "tasks": this.ownTasks }, null, 4));

        return true;
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
        // Reinitialize ownTasks since this can push tasks that are already there.
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

    listOneTask () {
        for (const task of this.ownTasks) {
            if (task.id === this.askedId) {
                console.log(task);
                return;
            }
        }

        console.log("\nCould not find the id, please check the ids of your tasks.");
    }

    showCurrentTask() {
        console.log("\nAdded task:\n");
        console.log(this.currentTask);
    }

    updateTask(path) {
        for (const task of this.ownTasks) {
            if (task.id === this.askedId) {
                this.currentTask = task;
                break;
            }
        }

        if (!this.deleteTask(path)) {
            return;
        }

        console.log("\nIf you do not want to change a task field, leave it empty:\n");

        const newDesc = readline.question(
            `Previous value was ${this.currentTask.description}, write something to change the description: `
        );                
        this.currentTask.description = newDesc === "" ? this.currentTask.description : newDesc;

        const newDateStart = readline.question(
            `Previous value was ${this.currentTask.date_start}, write something to change the start date: `
        );        
        this.currentTask.date_start = newDateStart === "" ? this.currentTask.date_start : newDateStart;

        const newDateEnd = readline.question(
            `Previous value was ${this.currentTask.date_end}, write something to change the end date: `
        );        
        this.currentTask.date_end = newDateEnd === "" ? this.currentTask.date_end : newDateEnd;

        const newStatus = readline.question(
            `Previous value was ${this.currentTask.status}, write something to change the status: `
        );        
        this.currentTask.status = newStatus === "" ? this.currentTask.status : newStatus;

        this.writeCurrentTask(path);
    }

    writeCurrentTask(path) {
        const allTasks = utils.readAndParseAllTasks(path);

        allTasks.tasks.push(this.currentTask);

        fs.writeFileSync(path, JSON.stringify(allTasks, null, 4));
    }
}

export default User;