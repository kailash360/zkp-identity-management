const Commands = require("./zkp/commands/commands");
const { executeCommand } = require("./zkp/utils");
const createZKP = require("./zkp/zkp");
const fs = require("fs")

// executeCommand("truffle migrate")

createZKP(66)

// const commands = Commands(30)

// const text = commands.join("\n")
// fs.writeFileSync("a.txt", text, "utf-8")