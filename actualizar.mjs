import {listTasksOnlyUser } from './listar.mjs';
import {archivo, today, useCreateMain, newJson} from './crear.mjs'
import readline from 'readline-sync';

var exitCase = ['Q', 'E', 'EXIT'];

// elementId: Busca si es el id esta en la lista, devulve [elemento,id del elemento en el array]
// searchElement: Pregunta por un id hasta que existe o hasta que decide salir. Si le pasas un mal parametro te devuele un 0 o un 2.
// SearchElement: Devuelve los mismo que elementId 
// modifyThis: Modifica el elemento hasta que se diga, devulve el numero de modificaciones hechas
// sendThis: Imprime tu modificacion y actualiza las tareas
// makeChanges: Muestra los parametros actuales de tus tareas, llama a modifyThis. Devuelve [id de la tarea, 1 si se ha modificado algo]
// makeDecision: Segun los parametros que le pases hace una accion o otra. Se usa mucho
// useUpdateMain: llamar desde main, es el que se usa para hacer los cambios pertinentes en el Json

// Mirar archivo(crear) , today(crear) , useCreateMain(crear) , newJson(crear)
// Mirar listTasksOnlyUser(listar)

function elementId(lista, id) {
    var element = 0;
    lista.forEach(ele => {
        if (ele['id'] == id) {
            element = ele;
        }
    });
    var count = lista.indexOf(element);
    return [element, count];
};

function searchElement(vector, onlyId) {
    var element = 0;
    while (true) {
        console.log("If u want to exit write, (q, e or exit)");
        console.log(onlyId);
        if (typeof onlyId === "object") {
            var idThis = readline.question("Select a task (select an id): ");
        } else {
            return[2,0]
        }
        var idThisInt = parseInt(idThis);
        if (typeof idThisInt === 'number' && !isNaN(idThisInt)) {
            if (onlyId.includes(idThisInt)){
                var element = elementId(vector, idThisInt);
                return [element[0], element[1]];
            }
        } else {
            if ( exitCase.includes(idThis.toUpperCase()) ) {
                return [0, idThis];
            }
        }
        console.log("You only can select "); 
        console.log(onlyId);
    }
}

function modifyThis(element, modified = 0) {
    while (true) {
        console.log("If u want to exit write, (q, e or exit)");
        var a = readline.question("What data do you want to update? except id: ");
        if (a in element && a != "id") {
            modified ++;
            let b = readline.question(`New value of ${a}: `);
            element[a] = b;
            if (a == "status" && (b == "Done" || b == "done" )){
                element['date_end'] = today;
            }

        };
        if(exitCase.includes(a.toUpperCase())) {
            return modified;
        }
    }
}

function sendThis(element, devolver, file= archivo, message = "update") {
    if (message === "update") {
        console.log("Your new element is");
    } else {
        console.log("The element deleted is: ")
    }
    console.log(element);
    newJson(file, devolver);
}


function makeChanges(elementUser, idUser) {
    var parameter = 0;
    if (elementUser != 0) {
        var keysElement = Object.keys(elementUser);
        keysElement.forEach( key => {
        console.log(`${key}: ${elementUser[key]}`);
        });

        var modified = modifyThis(elementUser);               
        parameter =  modified > 0 ?  1 : 0;

    }
    return [idUser, parameter];

}

function makeDesicion(boolError = false, parameter, devolver, element, id, file = archivo, user, option="update") {
   // Vienen actualizados devolver y element valen lo mismo

    if (!boolError){

        if (parameter === 0) {
            console.log("You have decided to go out, have a good day!");

        } else if (parameter === 1) {
            if (option === "update") {
                devolver.splice(id,1, element);
                sendThis(element, devolver, file, "update"); 
            }else {
                console.log(element);
                var questionCreate = readline.question("Really you want to delete this task? [Y or S, to say yes, anything else will be a no ]: ");
                if (questionCreate.toUpperCase() == 'Y' || questionCreate.toUpperCase() == 'S'){
                    devolver.splice(id, 1);
                    sendThis(element, devolver, file, "delete");
                }
                console.log("Have a nice day !");

            }
            
        }
        else if (parameter === 2) {
            console.log("You can't update nothing");
            var questionCreate = readline.question("Want to create a new task?[Y or S, to say yes, anything else will be a no ] ");
            if (questionCreate.toUpperCase() == 'Y' || questionCreate.toUpperCase() == 'S'){
                useCreateMain(file, user);
            }else {
                console.log("Have a nice day!!!!")
            }
        }
    }
}

//Poner llamada para imprimir
function useUpdateMain(file = archivo, user ) {
    var finalActionUpdate = 0;
    var id = 0;
    var errorUpdate = false;

    var onlyUserData = listTasksOnlyUser(file, user);
    var elementsUser = onlyUserData[0];
    var onlyIdUser = onlyUserData[1];
    var devolver = onlyUserData[2];
    try {
        if (devolver === 2 || devolver === 1) {
            finalActionUpdate = devolver === 2 ? 2:1; 
            return;
        }
        if (elementsUser === 2) {
            finalActionUpdate = 2;
            return;
        }

        var elementData = searchElement(devolver, onlyIdUser);
        var element = elementData[0];
        id = elementData[1];
        if (element === 0) {
            finalActionUpdate = 0;
            return;
        }
        var changes = makeChanges(element, id);
        id = changes[0];
        finalActionUpdate = changes[1];
        
    }
    catch(error){
        console.log(error)
        console.log("Take a look in your data field");
        errorUpdate = true;
        
    }finally {
        makeDesicion(errorUpdate, finalActionUpdate, devolver, element, id, file, user);
        
    }        
}

export { makeDesicion, elementId,searchElement, modifyThis, sendThis, useUpdateMain };