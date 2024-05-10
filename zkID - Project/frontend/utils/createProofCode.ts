import { IProof } from "@components/types";


export const createProofCode = (proof: IProof["proof"]) => {
    if(!proof) return "";
    const [a,b,c] = proof;
    const t = `
    [
        [
            "${a[0]}",
            "${a[1]}"
        ],
        [
            [
                "${b[0][0]}",
                "${b[0][1]}"
            ],
            [
                "${b[1][0]}",
                "${b[1][1]}"
            ]
        ],
        [
            "${c[0]}",
            "${c[1]}"
        ]
    ]`

    return t;
}