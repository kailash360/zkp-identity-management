const fs = require("fs")

const getProofVector = () => {
    const { proof } = JSON.parse(fs.readFileSync("C:\\Users\\ABC\\Desktop\\zkp-project\\backend\\zkp\\proof\\proof.json", "utf-8"))
    const {a, b, c} = proof
    s = [a,b,c]
    t = `[["${a[0]}","${a[1]}"],[["${b[0][0]}","${b[0][1]}"],["${b[1][0]}","${b[1][1]}"]],["${c[0]}","${c[1]}"]]`
    fs.writeFileSync("C:\\Users\\ABC\\Desktop\\zkp-project\\backend\\zkp\\proof\\proofVector.json", JSON.stringify(s), "utf-8")

    return s;
}

module.exports = {
    getProofVector
}
