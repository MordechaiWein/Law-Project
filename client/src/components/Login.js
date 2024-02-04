import React from 'react'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { useLocation } from 'react-router-dom'

function Login() {

    const { pathname } = useLocation()
    
    return (

        <>
            {pathname !== '/' ? ( 

                <SignUp pathname={pathname}/>

                ):( 
                    
                <SignIn/>
            )}
        </>
    )
}
export default Login