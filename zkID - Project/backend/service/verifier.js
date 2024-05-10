const { verify } = require("../controller")

const handleVerification = async(req, res) => {
    const {user} = req.body
    const {address} = req.headers

    const verificationResult = await verify(user, address)

    return res.json({success: true, data: {verdict: verificationResult}})
}

module.exports = {
    handleVerification
}