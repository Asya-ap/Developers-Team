import fs from 'fs';
import { searchElement } from './actualizar.js';
import {existFile, archivo} from './crear.js'

// listTasks: Te devuelve las tareas a no ser que exista algun error.
// oneTask: Te muestra por consola una tarea concreta a no ser que no haya tareas
// listsTasksOnlyUser: Devuelve [las tareas de una persona, sus id respectivos, todas las tareas]
// onlyUser: Devuelve [las tareas de una persona, sus id respectivos]
// useListMain: Si le pasas true a uno de los parametros, imprime las tareas de cada usuario. Siempre que pase las comprobaciones
// useListMain: Devuelve lo mismo que listTasksOnlyUser

// Mirar existFile(crear) , archivo(crear) y seachElement(actualizar)

function listTasks(file = archivo, option ="y") {
    
    try {
        existFile(file);
        var tasks =  JSON.parse(fs.readFileSync(file)).tasks;
        if (option === 'y') {
            console.log(tasks);
        }
        tasks = Object.values(tasks);
        if (tasks.length == 0) {

            return 2;
        }
        return tasks;
    } catch(err) {
        console.log(err)
        return 1;
    }
}
function oneTask(file, user) {
    var tasksData = useListMain(file, user, false);
    var tasks = tasksData[2];
    var idsUser = tasksData[1];
    var elementData = searchElement(tasks, idsUser);
    if (elementData[0] !== 0 && elementData[0] !== 2){
        console.log(elementData[0]);
    } else {
        console.log("No Data");
    }

}

function listTasksOnlyUser(file, user, option = 'y') {
    var tasks = listTasks(file, 'n');
    if (tasks !== 2 || tasks !== 1){
        var tasksUser = onlyUser(user, tasks, 'n');
        if (tasksUser[0] !== 2) {
            if (option === 'y') return [tasksUser[0], tasksUser[1], tasks];
            return tasksUser;
        }
        return [2,2,tasks]
    }
    return [tasks, tasks, tasks];

}

function onlyUser(user, devolver, option = 'y') {
    var newDevolver = [];
    var onlyIdUser = [];
    console.log(user);
    if (devolver.length > 0) {
        devolver.forEach( element => {
            if (element['user'] == user) {
                newDevolver.push(element);
                onlyIdUser.push(element['id']);
            }
        })
    };
    if (newDevolver.length > 0){
        if (option === 'y'){
            console.log(newDevolver);
            console.log(onlyIdUser);
        } 
        
        return [newDevolver, onlyIdUser];
    }
    return [2, 2];
}

function useListMain(file = archivo, user, show = false) {
    const tasks = listTasksOnlyUser(file, user, 'y');
    if (tasks[0] === 0 || tasks[0] === 2) {
        var message = tasks[0] === 0 ? "Check Json fil" : "You don't have any data";
        console.log(message);
    }
    else{
        if (show) console.log(tasks[0]);
    }
    // error aqui
    return tasks;
}


export { useListMain, listTasks, onlyUser, listTasksOnlyUser, oneTask};