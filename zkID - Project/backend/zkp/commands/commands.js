const Commands = (_value) => [
    `zokrates compile \
        -i .\\zkp\\program\\age.zok \
        --output .\\zkp\\bin\\out \
        --abi-spec .\\zkp\\bin\\abi.json \
        --r1cs .\\zkp\\bin\\out.r1cs
    `,
    `zokrates setup \
        --input .\\zkp\\bin\\out \
        --proving-key-path .\\zkp\\bin\\proving.key \
        --verification-key-path .\\zkp\\bin\\verification.key
    `,
    `zokrates compute-witness \
        --input .\\zkp\\bin\\out \
        --output .\\zkp\\bin\\witness \
        --abi-spec .\\zkp\\bin\\abi.json \
        --circom-witness .\\zkp\\bin\\out.wtns \
        -a ${_value}
    `,
    `zokrates generate-proof \
        --input .\\zkp\\bin\\out \
        --proof-path .\\zkp\\proof\\proof.json  \
        --proving-key-path .\\zkp\\bin\\proving.key \
        --witness .\\zkp\\bin\\witness
    `,
    `zokrates export-verifier \
        --input .\\zkp\\bin\\verification.key \
        --output .\\contracts\\zkp\\verifier.sol
    `,
    `zokrates verify \
        --proof-path .\\zkp\\proof\\proof.json \
        --verification-key-path .\\zkp\\bin\\verification.key
    `
]

module.exports = Commands;