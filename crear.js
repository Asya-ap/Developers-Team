var fs = require('fs');

var newJsonFile = {};
newJsonFile.tasks = [];

const archivo = "./tasks.json";
const today = new Date().toDateString();

// var task = createTask(2, "Jhon", "Ir al dentista"); crear cada una desde el main

function sortJson (a, b) {
    if (a.id > b.id) {
        return 1;
    }
    if (a.id < b.id) {
        return -1;
    }
    return 0;
};

function createTask(user, description, date_start = today, date_end="", status="Pendind") {
    var newObject = {
        id: 1,
        user: user,
        description: description,
        date_start: date_start,
        date_end: date_end,
        status: status
    }

    return newObject
};

function CreateUpdateJson(file, task) {
    var devolver = [];
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            return devolver;
        } else {

            devolver = JSON.parse(data).tasks;
            newJson(file, devolver, task);
        }
    });
};
        
function newJson(file, oldTasks, newTask) {
    var id = 1;
    if (oldTasks) {
        oldTasks.forEach(dato => {
            if(dato) newJsonFile.tasks.push(dato);
        });
        newJsonFile.tasks.sort(sortJson);
        id = newJsonFile.tasks[newJsonFile.tasks.length -1]['id'] + 1;
    }
    newTask['id'] = id;
    newJsonFile.tasks.push(newTask);
    newJsonFile.tasks.sort(sortJson);
    fs.writeFile(file, JSON.stringify(newJsonFile, null, 4), err => {
        if(err) throw err;
        console.log('New task added');
    })
};

function useCreateMain(file = archivo, user, description, date_start = today, date_end="", status="Pendind") {
    var task = createTask(user, description, date_start, date_end, status);
    CreateUpdateJson(file, task);
}

module.exports = {
    useCreateMain,
    archivo, today
}

// Ejemplo de uso
// const crear = require('./crear'); esto en el main
// crear.useCreateMain("tasks.json", "Jhon", "Dentista", "martes 17 enero", "martes 17 enero"); esto en el main