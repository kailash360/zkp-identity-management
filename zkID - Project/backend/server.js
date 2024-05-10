const Express = require("express");
const cors = require("cors");
const { handleAddProperty, handleFetchProof } = require("./service/prover");
const { handleVerification } = require("./service/verifier");

const app = Express();

app.use(Express.json());
app.use(cors());

app.get("/proof", handleFetchProof)
app.post("/add", handleAddProperty)
app.post("/verify", handleVerification)

app.listen(5000, () => {
    console.log("Server started at http://127.0.0.1:5000")
})