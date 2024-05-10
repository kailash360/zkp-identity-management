const { createProofAndVeriff } = require( "./utils");
const { getProofVector } = require("./utils/createProofVector");

const createZKP = async(_value) => {
    try{
        await createProofAndVeriff(_value);
    
        const proofVector = getProofVector()
        console.log("ZKP created and proof vector ready...")
    
        return proofVector;

    } catch(err){
        console.log("Failed to create ZKP", err)
        return null;
    }
}

module.exports = createZKP

