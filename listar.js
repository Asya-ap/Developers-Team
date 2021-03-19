const fs = require("fs");

function taskList(username){
fs.readFileSync("./tasks.json", "utf8", (err, data)=>{
    
    if(err) {
        console.error(err);
    }else
    try{
        const tasks = JSON.parse(data).tasks;
        
        for(const key in tasks){
            if(tasks.hasOwnProperty(key)){
            console.log(tasks[key].id);
            }
        }
    
    }catch(error){
      console.log("Something is wrong");
    }
})
}

console.log(taskList("2"));
//module.exports = { taskList };


