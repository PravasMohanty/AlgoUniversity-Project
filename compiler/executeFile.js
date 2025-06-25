const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { rejects } = require('assert')
const { stderr } = require('process')
const { error } = require('console')

const dirOp = path.join(__dirname,"outputs")

if (!fs.existsSync(dirOp)) {
    fs.mkdirSync(dirOp, { recursive: true })
}

const executeFile = async (filePath , language) => {
    const JobId = path.basename(filePath).split(".")[0];
    let compileCmd, runCmd;

    switch (language) {
        case 'Python':
            compileCmd = ""; // No compile step
            runCmd = `python "${filePath}"`;
            break;
        case 'Java':
            compileCmd = `javac "${filePath}"`;
            runCmd = `java -cp ${path.dirname(filePath)} ${JobId}`;
            break;
        default: // C++
            const outputPath = path.join(dirOp, `${JobId}.exe`);
            compileCmd = `g++ "${filePath}" -o "${outputPath}"`;
            runCmd = `"${outputPath}"`;
            break;
    }

    return new Promise((resolve, reject) => {
        if (compileCmd) {
            exec(compileCmd, (compileError, stdout, stderr) => {
                if (compileError) {
                    return reject({ error: compileError.message });
                }
                exec(runCmd, (runError, runStdout, runStderr) => {
                    if (runError) {
                        return reject({ error: runError.message });
                    }
                    resolve(runStdout);
                });
            });
        } else {
            exec(runCmd, (runError, runStdout, runStderr) => {
                if (runError) {
                    return reject({ error: runError.message });
                }
                resolve(runStdout);
            });
        }
    });
}

module.exports = executeFile;