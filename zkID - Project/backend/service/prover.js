const { storeOnChain, getProofFromChain } = require("../controller")

const handleAddProperty = async (req, res) => {
    try {
        const {value} = req.body
        const {address} = req.headers
    
        await storeOnChain(value, address)
    
        return res.json({success: true, data: "Stored on chain successfully"})
    }catch(err){
        console.log("Error in adding new proof", err)
        return res.json({success: false, message: err})
    }
}

const handleFetchProof = async(req, res) => {
    try {
        const {address} = req.headers

        const {proof, verifierAddress, timestamp} = await getProofFromChain(address, address)
        console.log(typeof timestamp)

        return res.json({success: true, data: {proof, verifier: verifierAddress, timestamp}})

    }catch(err){

    }
}

module.exports = {
    handleAddProperty,
    handleFetchProof
}