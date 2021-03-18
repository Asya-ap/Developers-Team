const fs = require('fs');
const crear = require('./crear');
const readline = require('readline-sync');

// elementId busca si es el id esta en la lista, devulve el elemento o un 0
// searchElements pregunta por un id hasta que existe(elementId) o hasta que decide salir, devuelve el elemento y su indice o un 0 y el valor de busqueda en caso de que se decida salir
// modifyThis modifica el elemento hasta que se diga, devulve el numero de modificaciones hechas
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

function searchElements(vector) {
    var element = 0; 
    while (true) {
        console.log("If u want to exit write, (q, e or exit)");
        var idThis = readline.question("Select a task (select an id): ")
        var element = elementId(devolver, idThis);
        if (element === 0) {
            console.log("The id doesn't exist");
            if (idThis == 'q' || idThis == 'e' || idThis == 'exit') {
                return [0, idThis];
            }

        } else {
            return [element, idThis];
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
        if (a == 'q' || a == 'e' || a == 'exit') {
            return modified;
        }
    }
}

function sendThis(element, devolver) {
    console.log("Your new element is");
    console.log(element);
    crear.newJson(crear.archivo, devolver);
    console.log('New task modified');
}

function useUpdateMain(file = crear.archivo ) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            devolver = JSON.parse(data).tasks;
            if (!devolver) {
                console.log("You can't update nothing, have a good day!");
                return;
            }
            console.log(devolver);

            var elements = searchElements(devolver);
            var element = elements[0];
            var id = elements[1];

            if (element != 0) {

                var keysElement = Object.keys(element);
                keysElement.forEach( key => {
                console.log(`${key}: ${element[key]}`);
                });

                var modified = modifyThis(element, 0);
                
                if (modified > 0) {
                    devolver.splice(id,1, element);
                    sendThis(element, devolver);
                    
                } else {
                    console.log("You have not modified any task, have a good day! ");
                }
            } else {
                console.log("You have decided to go out, have a good day!");
            }
            
        }
    })
};
module.exports = { useUpdateMain };