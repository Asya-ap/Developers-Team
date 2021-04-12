import fs from "fs";

function sortJson(a, b) {
    if (a.id > b.id) {
        return 1;
    }

    if (a.id < b.id) {
        return -1;
    }

    return 0;
};

function readAndParseAllTasks(path) {
    if (fs.existsSync(path)) {
        const rawData = fs.readFileSync(path);
        const allTasks = JSON.parse(rawData);

        return allTasks
    }

    return;
}

function isJsonEmptyOrMalformed(path) {
    try {
        const allTasks = JSON.parse(fs.readFileSync(path));
        
        return false;
    } catch {
        return true;
    }
}

export default {
    sortJson,
    readAndParseAllTasks,
    isJsonEmptyOrMalformed
}