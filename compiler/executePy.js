const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

const executePy = (filepath, inputpath) => {
    return new Promise((resolve, reject) => {
        exec(
            `python "${filepath}" < "${inputpath}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        )
    });
};

module.exports = {
    executePy
}