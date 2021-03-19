const fs = require("fs");
const archivo = "./tasks.json";

function deleteTask(file, task_id){
   
    data = fs.readFileSync(file); 
    devolver = JSON.parse(data); //(data).tasks no se pone porque sino la variable se como el array
    
    devolver.tasks.forEach((element, index)=>{
        if(element.id === task_id){
            devolver.tasks.splice(index, 1);
        }
    });
    fs.writeFileSync(archivo, JSON.stringify(devolver));
    }

    
    module.exports = { deleteTask };
       