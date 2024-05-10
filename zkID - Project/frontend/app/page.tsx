"use client"

import Home from "../pages/home"
import Prover from "../pages/prover"
import Verifier from "../pages/verifier"
import { useState, useCallback, useEffect, useMemo, createContext, useContext } from "react";
import { USER } from "@components/types";
import Connect from "@components/utils/connect";
import User from "../config/user.json"
import "./globals.css"
import {UserContext} from "@components/context";
import Loading from "@components/pages/loading";

export default function Index() {

  const { updateAccount} = useContext(UserContext)

  const [userState, setUserState] = useState<USER>(USER.UNREGISTERED)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getAccounts = useCallback(
    async () => {
      const accountResponse = await Connect()
      const _account = accountResponse.data?.account
      updateAccount?.(_account)
      setIsLoading(false)
      switch(_account.toLowerCase()) {
        case User.prover:
          setUserState(USER.PROVER)
          return;
        case User.verifier:
          setUserState(USER.VERIFIER)
          return;
        default:
          setUserState(USER.UNREGISTERED)
          return;
      }
    },
    [],
  )

  useEffect(() => {
    getAccounts()
  }, [])

  const page = useMemo(() => {
    if(isLoading) return <Loading />

    switch(userState) {
      case USER.UNREGISTERED:
        return <Home />;
      case USER.PROVER:
        return <Prover />;
      case USER.VERIFIER:
        return <Verifier />;
    }
  }, [userState, isLoading])

  return (
      <div className="main">
        {page}
      </div>
  )

}
