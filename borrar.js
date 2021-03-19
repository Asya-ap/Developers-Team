const fs = require('fs');
const file = require("./tasks.json");

file.delete('/:id', function (err, data){
    let taskFound = tasks.find(function(task){
        return task.id === parseInt(data.params.id)
    });

    if(taskFound){
        let tagetIndex = tasks.indexOf(tasksFound);
        tasks.splice(targetIndex, 1);
    }
    console.log('Task deleted');
});

module.exports = { file };