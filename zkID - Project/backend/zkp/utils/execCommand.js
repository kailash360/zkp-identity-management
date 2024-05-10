const { exec } = require('child_process');

// Function to execute a single command
const executeCommand = async (command, log = true) => {
  return new Promise(async (resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (stderr || error) {
            console.error(stderr || error);
            reject(error);
            return;
        }
        if(log){
          console.log(`
              ${command} 
              ${stdout}
          `);
        }
      resolve(stdout);
    });
  });
}

// Function to execute an array of commands in sequence
const executeCommands = async (commands, log=true) => {
    for (const command of commands) {
      try {
        const result = await executeCommand(command, log);
      } catch (error) {
        console.error(error);
        break; // Stop executing further commands on error
      }
    }
  }

module.exports = {
    executeCommand,
    executeCommands
}