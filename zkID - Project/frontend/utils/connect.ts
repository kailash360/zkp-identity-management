const Connect = async() => {
    try {

        if (!window.ethereum) throw new Error('Please enable Metamask and connect to a network')

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]

        return { success: true, data: { account } }
    } catch (err: any) {
        console.log('Error in getting account', err.message)
        return { success: false, message: err.message }
    }
}

export default Connect