const {proof} = require("../proof/proof.json")
const fs = require("fs")

const {a, b, c} = proof

s = `[["${a[0]}","${a[1]}"],[["${b[0][0]}","${b[0][1]}"],["${b[1][0]}","${b[1][1]}"]],["${c[0]}","${c[1]}"]]`
fs.writeFileSync("proofVector.json", s)