import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export function UserProvider ({ children }) {
  const [user, setUser] = useState({
    firstNames: 'Cargando ...',
    lastNames: 'Cargando ...',
    email: 'ejemplo@gmail.com',
    phoneNumber: '932002001',
    professionalCareer: 'APSTI',
    semester: 'IV',
    birthDate: '22/05/2006',
    dni: '00000001',
    urlImage: null,
    blurhash: ''
  })

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser () {
  return useContext(UserContext)
}
