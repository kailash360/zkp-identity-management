"use client";

import React, { createContext, useCallback, useState } from 'react'

interface IUserContext {
    account?: string;
    updateAccount?: Function;
}

export const UserContext = createContext<IUserContext>({})

function UserContextProvider(props: any) {
    const [account, setAccount] = useState<string>("")

    const updateAccount = useCallback((_account: string) => {
        setAccount(_account)
    }, [])

    return (
        <UserContext.Provider value={{account, updateAccount}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider