import readline from 'readline-sync';

class Task {
    constructor (user, id, description = "No Description", date_start = new Date().toDateString(), date_end = "", status = "Pending") {
        this.username = user.username;
        this.id = id;
        this.description = readline.question("Task description: ") || description;
        this.date_start = readline.question("When do you plan to start: ") || date_start;
        this.date_end = readline.question("When do you plan to end: ") || date_end;
        this.status = readline.question("Task status: ") || status;
    }
}

export default Task;