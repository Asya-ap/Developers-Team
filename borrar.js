const fs = require("fs");
const archivo = "./tasks.json";

function deleteTask(file = archivo, task_id){
   
    fs.readFile(file, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            try{
            devolver = JSON.parse(data).tasks;

            devolver.forEach((element, index)=>{
                if(devolver.id === task_id){
                    devolver.id.splice(index, index);
                }
            })
            } catch(error){
                console.log("No tasks left");
                
            }

            }
        })

    }
 console.log(deleteTask());
    
    //module.exports = { deleteTask };
       