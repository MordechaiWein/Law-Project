import React, { useState, useEffect } from "react"

const AppContext =  React.createContext() 

function MyProvider({children}) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [signUpFormVisible, setSignUpFormVisible] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('/me')
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    setUser(data)
                    setIsLoading(false)
                })      
            } else { setIsLoading(false) }
        })
    },[])

    return (

        <AppContext.Provider 
            value={{setUser, user, isLoading, signUpFormVisible, setSignUpFormVisible}}
        >
            {children}
        </AppContext.Provider>
    ) 
}
export { MyProvider, AppContext}