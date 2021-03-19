const fs = require('fs');

const file = "./tasks.json";
 

function deleteTask(file = file, task_id){
    fs.readFile(file, 'utf-8', (err, data) =>{
        
    })
    file.tasks.forEach(function(element, index){
        if(file.id[index].id === task_id){
            file.id.splice(index, index);
        }
    })
}

module.export = { deleteTask }

fs.readFile(file, 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        try {

        
            devolver = JSON.parse(data).tasks;

