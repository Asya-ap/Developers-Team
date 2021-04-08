import {useListMain} from './listar.js';
import fs from 'fs';
import readline from 'readline-sync';

const archivo = "./tasks.json";
const today = new Date().toDateString();

// sortJson: Ordena los valores segun su id
// writeJson: Escribe un Json segun los datos que le pases, si no muestra los errores
// existFile: Si no existe el archivo, lo crea. Si existe no hace nada
// createTask: Crea una tarea, te la devuelve
// createUpdateJson: Lee el Json y hace los demas procedimientos
// newJson: Segun lo que contenga el Json usa la funcion de sort, si hay algun error se para, si no se vuelve a escribir el json
// questionsCreate: Hace las preguntas para crear una tarea si tienen algun valor no valido se asignan unos valores predeterminados
// questionsCreate: Se devuelven las preguntas hechas
// useCreateMain: Llamada desde el main para crear una nueva tarea

// Mirar useListMain(listar)

function sortJson (a, b) {
    if (a.id > b.id) {
        return 1;
    }
    if (a.id < b.id) {
        return -1;
    }
    return 0;
};

function writeJson(file = archivo, content) {
    try {
        fs.writeFileSync(file,JSON.stringify(content, null, 4));

    } catch(err) {
        console.log(err)
        return 0
    }

}

function existFile(file = archivo) {
    if(!fs.existsSync(file)) {
        
        writeJson(file, "{}");
    }
}

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

function CreateUpdateJson(file, task, user) {
    
    const devolver = useListMain(file, user)[2];
    if (devolver === 0) {
        console.log("check json file");
    } else {
        try{
            
            var updateResult = newJson(file, devolver, task);
            if (updateResult != 0) {
                console.log("Succseful! Check your json file")
                return;
            }
            console.log("Some fail occur with your data it can't be modified");
    
        } catch {
            console.log("Check your data file");
        }
    }
};
        
function newJson(file, oldTasks, newTask) {
    var id = 1;
    var newJsonFile = {};
    newJsonFile.tasks = [];
    if (oldTasks && oldTasks.length > 0) {
        // El error parece estar en el oldtasks que se mandan
        oldTasks.forEach(dato => {
            if(dato){
                newJsonFile.tasks.push(dato);

            }
        });

        newJsonFile.tasks.sort(sortJson);
        id = newJsonFile.tasks[newJsonFile.tasks.length -1]['id'] + 1;
    }
    if (newTask) {
        newTask['id'] = id;
        newJsonFile.tasks.push(newTask);
        newJsonFile.tasks.sort(sortJson);
    }
    var newJsonResult = writeJson(file, newJsonFile);
    return newJsonResult
};

function questionsCreate(){
    var description = readline.question("Tell me your description: ");
    var date_start = readline.question("Tell me, the start date: ");
    var date_end = readline.question("Tell me, the end date: ");
    var status = readline.question("Tell me, the status of your task: ");

    description = description === ""? "No Description": description ;
    date_start = date_start !== "" ? date_start : today;
    status = status !== "" ? status : "Pending";

    return [description, date_start, date_end, status];
}
function useCreateMain(file = archivo, user) {

    var questions = questionsCreate();
    var task = createTask(user, questions[0], questions[1], questions[2], questions[3]);
    CreateUpdateJson(file, task, user);
    
}
// useCreateMain(archivo, "Jhon");

// useCreateMain(archivo, "jhon");
export { existFile, archivo, useCreateMain, today, newJson, writeJson};