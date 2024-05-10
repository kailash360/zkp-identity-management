const Commands = require( "../commands/commands")
const { executeCommands } = require( "./execCommand")

const createProofAndVeriff = async (_value) => {
    try {
        const commands = Commands(_value)
        await executeCommands(commands, false)
        console.log("Proof and verifier contract generated...")
    }catch (err) {
        console.error("Zokrates phase failed", err)
    }
}

module.exports = {
    createProofAndVeriff
}