import { createContext, useState, useEffect } from 'react'

export const firebaseContext = createContext()

const FirebaseContextProvider = ( {children} ) => {
  
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("userToken")))
    const [userMail, setUserMail] = useState(JSON.parse(localStorage.getItem("userMail")))
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username")))
    
    const contextData = {
        authToken, 
        setAuthToken,
        userMail,
        setUserMail,
        username,
        setUsername
    }

    useEffect(() => {
        if(authToken != null){
            localStorage.setItem("userToken", JSON.stringify(authToken))
            localStorage.setItem("userMail", JSON.stringify(userMail))
            localStorage.setItem("username", JSON.stringify(username))
        }
        
      }, [authToken])
  
    return (
       <firebaseContext.Provider value={contextData}>
            {children}
       </firebaseContext.Provider>
  )
}

export default FirebaseContextProvider