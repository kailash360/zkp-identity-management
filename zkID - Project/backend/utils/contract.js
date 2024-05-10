const web3 = require("../config/web3")
const fs = require("fs")

const createContractInstance = async (artifact) => {
    const {abi, networks} = artifact
    const {address} = networks["5777"]

    const contract = new web3.eth.Contract(abi, address)

    return contract;
}

const createZkIDInstance = async () => {
    const zkIdPath = "C:\\Users\\ABC\\Desktop\\zkp-project\\backend\\build\\contracts\\zkID.json"
    const artifact = JSON.parse(fs.readFileSync(zkIdPath, "utf8"))
    const contract = await createContractInstance(artifact)

    return contract
}

const createVerifierInstance = async(_address) => {
    const verifierPath = "C:\\Users\\ABC\\Desktop\\zkp-project\\backend\\build\\contracts\\zkp\\Verifier.json"
    const artifact = JSON.parse(fs.readFileSync(verifierPath, "utf8"))

    const {abi} = artifact
    
    const contract = new web3.eth.Contract(abi, _address)

    return contract
}

module.exports = {
    createZkIDInstance,
    createVerifierInstance
}