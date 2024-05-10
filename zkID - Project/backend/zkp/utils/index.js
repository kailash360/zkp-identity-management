const create = require("./create");
const execCommand = require("./execCommand");
const getProofVector = require("./createProofVector");

module.exports = {
    ...create,
    ...execCommand,
    ...getProofVector
}