
var fs = require('fs');

const archivo = require("./tasks.json");

//Object.keys(jsonArray).length;

function list_all(file, task) {
    var devolver = [];
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            return devolver;
        } else {

            devolver = JSON.parse(data).tasks;
            
        }
    });
};

module.exports = { list_all };