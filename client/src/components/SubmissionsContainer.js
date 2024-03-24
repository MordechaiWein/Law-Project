import React, { useContext, useState } from 'react'
import styles from '../styles/SubmissionsStyles'
import SubmissionsPage from '../pages/SubmissionsPage'
import SubmissionsNavigation from '../pages/SubmissionsNavigation'
import TemporaryLinkForm from './TemporaryLinkForm'
import Container from '@mui/material/Container'
import { useMediaQuery } from '@mui/material'
import { AppContext } from "./AppContext"

function SubmissionsContainer() {

    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const isMobile = useMediaQuery('(max-width: 750px)')

    const [hideNavbar, setHideNavbar] = useState(false)

    const { signUpFormVisible } = useContext(AppContext)

    return (
    
        <Container disableGutters style={{ maxWidth: isLgScr ? "2700px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>
            
            <SubmissionsNavigation isMobile={isMobile} hideNavbar={hideNavbar} />

            <SubmissionsPage isMobile={isMobile}  setHideNavbar={setHideNavbar} hideNavbar={hideNavbar}/>

            { signUpFormVisible ? <TemporaryLinkForm /> : null }
       
        </Container>
    )
}
export default SubmissionsContainer