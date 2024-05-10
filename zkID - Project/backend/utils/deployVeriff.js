const fs = require('fs')
const { executeCommand } = require("../zkp/utils");

const deployVeriff = async () => {
    try {
        // compile
        console.log("Compiling verifier contract...")
        await executeCommand(`truffle compile .\\contracts\\zkp\\verifier.sol --contracts_build_directory=.\\build\\contracts\\zkp`, false)
    
        // deploy
        console.log("Deploying verifier contract...")
        await executeCommand(`truffle deploy --contracts_build_directory=.\\build\\contracts\\zkp --migrations_directory=.\\migrations\\zkp --contracts_directory=.\\build\\contracts\\zkp`, false)

    } catch (e) {
        console.log(e)
    }
}

module.exports = deployVeriff