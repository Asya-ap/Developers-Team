const fs = require('fs');

const file = require("./tasks.json");
 

function deleteTask(task_id){
    file.id.forEach(function(element, index){
        if(file.id[index].id === task_id){
            file.id.splice(index, index);
        }
    })
}

module.export = { deleteTask }

