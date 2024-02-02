import React, { createContext, useState } from 'react'

const AutContext = createContext()

function AuthContextProvider(props) {
  const [user, setUser] = useState(null)

  return (
    <AuthContextProvider value={ {user, setUser} }>
    {props.children}
    </AuthContextProvider>
  )
}
export { AuthContextProvider }
export default Autcontext