import React, { useContext } from 'react'
import SubmissionsNavigation from '../pages/SubmissionsNavigation'
import SubmissionsPage from '../pages/SubmissionsPage'
import TemporaryLinkForm from './TemporaryLinkForm'
import styles from '../styles/SubmissionsStyles'
import { AppContext } from "./AppContext"
import Container from '@mui/material/Container'
import { useMediaQuery } from '@mui/material'

function SubmissionsContainer() {

    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const isMobile = useMediaQuery('(max-width: 750px)')

    const { signUpFormVisible } = useContext(AppContext)

    return (
    
        <Container disableGutters style={{ maxWidth: isLgScr ? "2400px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>
            
            <SubmissionsNavigation isMobile={isMobile} />

            <SubmissionsPage isMobile={isMobile} />

            { signUpFormVisible ? <TemporaryLinkForm/> : null }
       
        </Container>
    )
}
export default SubmissionsContainer