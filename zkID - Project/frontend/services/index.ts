import { END_POINTS, URL } from "@components/constant"
import axios from "axios"

export const makeAPICall = async(endpoint: string, payload: any, sender: string, method = "GET") => {
    try {
        const response = await axios(
            `${URL.SERVER}/${endpoint}`,{
                headers: {
                    address: sender,
                    "Content-Type": "application/json"
                },
                method,
                data: JSON.stringify(payload)
            }
        )

        return {success: true, data: response.data}
    }catch (err){
        return {success: false, message: err}
    }
}


export const getProofs = async (address: string) => {
    try {
        const response = await makeAPICall(
            END_POINTS.GET_PROOF,
            {},
            address
        )

        return response
    }catch (err){
        return {success: false, message: err}
    }
}

export const addProof = async(value: number | string, address: string) => {
    try{
        const response = await makeAPICall(
            END_POINTS.ADD_PROOF,
            {value: Number(value)},
            address,
            "POST"
        )

        return response.data
    }catch(err){
        return {success: false, message: err}
    }
}

export const verifyProof = async(userAddress: string, address: string) => {
    try{
        const response = await makeAPICall(
            END_POINTS.VERIFY_PROOF,
            {user: userAddress},
            address,
            "POST"
        )

        return response.data
    }catch(err){
        return {success: false, message: err}
    }
}