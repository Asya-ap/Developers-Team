const fs = require('fs');
const crear = require('./crear');
const readline = require('readline-sync');


var exitCase = ['Q', 'E', 'EXIT'];
// elementId busca si es el id esta en la lista, devulve el elemento o un 0
// searchElements pregunta por un id hasta que existe(elementId) o hasta que decide salir, devuelve el elemento y su indice o un 0 y el valor de busqueda en caso de que se decida salir
// modifyThis modifica el elemento hasta que se diga, devulve el numero de modificaciones hechas
// onlyUser te limita a unicamente tu usario, devuelve las tareas disponibles y los id que representan
// sendThis imprime tu modificacion y actualiza las tareas
// useUpdateMain llamar desde main

function elementId(lista, id) {
    var element = 0;
    lista.forEach(ele => {
        if (ele['id'] == id) {
            element = ele;
            return element;
        }
    });
    return element;
};

function searchElements(vector, onlyId) {
    var element = 0; 
    while (true) {
        console.log("If u want to exit write, (q, e or exit)");
        var idThis = readline.question("Select a task (select an id): ");
        var idThisInt = parseInt(idThis);
        if (onlyId.includes(idThisInt)){
            var element = elementId(vector, idThisInt);
            
            return [element, idThisInt];
            
        }
        if ( exitCase.includes(idThis.toUpperCase()) ) {
            return [0, idThis];
        } else {
            console.log("You only can select "); 
            console.log(onlyId);
        }
    }
}

function modifyThis(element, modified) {
    while (true) {
        console.log("If u want to exit write, (q, e or exit)");
        var a = readline.question("What data do you want to update? except id: ");
        if (a in element && a != "id") {
            modified ++;
            let b = readline.question(`New value of ${a}: `);
            element[a] = b;
            if (a == "status" && (b == "Done" || b == "done" )){
                element['date_end'] = crear.today;
            }

        };
        if(exitCase.includes(a.toUpperCase())) {
            return modified;
        }
    }
}

function sendThis(element, devolver) {
    console.log("Your new element is");
    console.log(element);
    crear.newJson(crear.archivo, devolver);
}

function onlyUser(user, devolver) {
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
        return [newDevolver, onlyIdUser];
    }
    return [2, 2];

}



function useUpdateMain(file = crear.archivo, user ) {

    var finalActionUpdate = 0;
    var id = 0;
    var errorUpdate = false;
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            try {

            
                devolver = JSON.parse(data).tasks;
                if (!devolver) {
                    finalActionUpdate = 2;
                    return;
                }
                var elementsUser = onlyUser(user, devolver);
                var elementUser = elementsUser[0];
                var onlyIdUser = elementsUser[1];

                if (elementUser === 2) {
                    finalActionUpdate = 2;
                    return;
                }

                console.log(elementUser);
                console.log(onlyIdUser);
                var elements = searchElements(devolver, onlyIdUser);
                var element = elements[0];
                id = elements[1];
                

                if (element != 0) {

                    var keysElement = Object.keys(element);
                    keysElement.forEach( key => {
                    console.log(`${key}: ${element[key]}`);
                    });

                    var modified = modifyThis(element, 0);               
                    finalActionUpdate =  modified > 0 ?  1 : 0;

                } else {
                    finalActionUpdate = 0;
                }

                
            }
            catch(error){
                console.log("Take a look in your data field");
                errorUpdate = true;
                
            }finally {
                if (!errorUpdate){

                    if (finalActionUpdate === 0) {
                        console.log("You have decided to go out, have a good day!");
    
                    } else if (finalActionUpdate === 1) {
                        devolver.splice(id,1, element);
                        sendThis(element, devolver);       
                    }
                    else if (finalActionUpdate === 2) {
                        console.log("You can't update nothing");
                        var questionCreate = readline.question("Want to create a new task?[Y or S, to say yes, anything else will be a no ] ");
                        if (questionCreate.toUpperCase() == 'Y' || questionCreate.toUpperCase() == 'S'){
                            crear.useCreateMain(file, user);
                        }else {
                            console.log("Have a nice day!!!!")
                        }
                    }
                }
            }
            
        }
    });
    
};

module.exports = { useUpdateMain };