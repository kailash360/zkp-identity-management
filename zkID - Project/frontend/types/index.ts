export enum USER {
    UNREGISTERED = "UNREGISTERED",
    PROVER = "PROVER",
    VERIFIER = "VERIFIER"
}

export interface IProof {
    verifier?: string;
    proof?: [
        [string, string],
        [[string, string],[string, string]],
        [string, string]
    ],
    timestamp: number
}