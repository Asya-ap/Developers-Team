
const fs = require('fs');
const file = require("./tasks.json");



  function list_all (err, data){
    let tasksList = [];
    file.find({}, function(err, tasks){
        if(err){
            next(err);
        }else{
            for(let task of tasks){
             tasksList.push({id: task.id, name: task.user});
            }
            data.json({status:"success", message:"All up to day", data:{task: tasksList}})
        }
    })

}

module.exports = { list_all };


