const deployVeriff = require("../utils/deployVeriff");
const createZKP = require("../zkp/zkp");
const fs = require("fs")
const {createZkIDInstance, createVerifierInstance} = require("../utils")

const _sender = "0x6Adfd860e72090876583d3b0485418a179b069E1"

const storeOnChain = async (_value, sender) => {
    // generate proof vector
    const proof = await createZKP(_value)

    // deploy verifier contract on chain
    await deployVeriff();

    // get verifier address
    const verifierArtifactPath = "C:\\Users\\ABC\\Desktop\\zkp-project\\backend\\build\\contracts\\zkp\\Verifier.json"
    const artifact = JSON.parse(fs.readFileSync(verifierArtifactPath, "utf8"))
    const {address: verifierAddress} = artifact.networks["5777"]

    // create zkID contract instance
    const zkID = await createZkIDInstance()

    // store proof and address on chain
    const proofString = JSON.stringify(proof)
    const result = await zkID.methods.addProof(proofString, verifierAddress).send({
        from: sender,
        gas: 5500000,
        gasPrice: 5500000
    })

    console.log("Proof and Verifier stored on chain successfully...")

    return result
}

const getProofFromChain = async (_userAddress, sender) => {
    // create zkID instance
    const zkID = await createZkIDInstance()

    // get the proof and deserialize
    const {vector: proofString, verifier: verifierAddress, timestamp: timestampInBigInt} = await zkID.methods.getProof(_userAddress).call({
        from: sender
    })

    const proof = JSON.parse(proofString)
    const timestampInNumber = Number(timestampInBigInt)

    console.log("Proof and verifier fetched from chain successfully...")
    
    return {proof, verifierAddress, timestamp: timestampInNumber}
}


const verify = async (_userAddress, sender) => {
    // get proof and verifier address
    const {proof, verifierAddress} = await getProofFromChain(_userAddress, sender);

    // create a verifier instance
    const verifier = await createVerifierInstance(verifierAddress)

    // verify the proof using verifier contract instance
    const result = await verifier.methods.verifyTx(proof, [1]).call({})

    console.log("Verification result is ", result)

    return result
}

module.exports = {
    storeOnChain,
    getProofFromChain,
    verify
}


// const main = async ()=>{
//     await storeOnChain(300)
//     console.log("=================")
//     // await getProofFromChain(sender)
//     console.log("==================")
//     await verify(sender)
// }

// main()

