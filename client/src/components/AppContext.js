import React, { useState, useEffect } from "react"

const AppContext =  React.createContext() 

function MyProvider({children}) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [signUpFormVisible, setSignUpFormVisible] = useState(false)
    const [merchants, setMerchants] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetch('/me', {
            headers: {'X-Secret-Header': 'flatdragonswoopxzw337'}
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    setUser(data)
                    setIsLoading(false)
                })      
            } else { setIsLoading(false) }
        })
    },[])

    useEffect(() => {
        fetch('/merchants', {
            headers: {'X-Secret-Header': 'flatdragonswoopxzw337'}
        })
        .then(response => response.json())
        .then(data => setMerchants(data))
    }, [])
    
    function editMerchant(data) {
        const updateMerchants = merchants.map(merchant => {
            if (merchant.id === data.id) {
                return data
            } else {
                return merchant
            }
        })
        setMerchants(updateMerchants)
    }

    return (

        <AppContext.Provider 
            value={{
                setUser, 
                user, 
                isLoading, 
                signUpFormVisible, 
                setSignUpFormVisible,
                merchants,
                setMerchants,
                editMerchant
            }}
        >
            {children}
        </AppContext.Provider>
    ) 
}
export { MyProvider, AppContext}