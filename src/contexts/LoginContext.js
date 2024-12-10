import React, { createContext, useContext, useState } from 'react'

const LoginContext = createContext()

export function LoginProvider ({ children }) {
  const [isLoginVisible, setLoginVisible] = useState(true)
  const [isOTPVisible, setOTPVisible] = useState(false) // Estado para OTP

  return (
    <LoginContext.Provider
      value={{ isLoginVisible, setLoginVisible, isOTPVisible, setOTPVisible }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export function useLoginContext () {
  return useContext(LoginContext)
}
