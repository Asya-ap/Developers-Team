import {listTasksOnlyUser} from './listar.js';
import {archivo} from './crear.js'
import {makeDesicion, searchElement} from './actualizar.js'

// deleteTask: Eliminara una tarea segun el id que se le pregunte al usuario

// Mirar seachElement(crear) , listTasksOnlyUser(listar) , makeDecision(crear) y archivo (crear)

function deleteTask(file = archivo, user) {
    
    var elementsData = listTasksOnlyUser(file, user);
    var finalAction = 0;
    // var tasksUser = elementsData[0];
    var idsUser = elementsData[1];
    var tasks = elementsData[2];
    if (tasks !== 0 || tasks !== 2) {
        finalAction = 1;
    }
    var elementData = searchElement(tasks, idsUser);
    var element = elementData[0];
    var id = elementData[1];
    if ( element === 0 || element ===2){
        finalAction = element;
    }

    
    makeDesicion(false, finalAction, tasks, element, id, file, user, "delete");
}

export {deleteTask};