const fs = require("fs");
const archivo = "./tasks.json"

function taskList(username){

    const data = fs.readFileSync(archivo);
    const tasks = JSON.parse(data);

    tasks.tasks.forEach(element => {
        if(element.user === username){
            console.log(element);
        }
    })
}


module.exports = { taskList };


