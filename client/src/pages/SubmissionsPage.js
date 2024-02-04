import React, { useContext } from 'react'
import styles from '../styles/SubmissionsStyles'
import DropZoneContainer from '../components/DropZoneContainer'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AppContext } from "../components/AppContext"
import { useHistory } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 600, md: 1500, lg: 1850 } } })

function SubmissionsPage({ isMobile }) {

    const history = useHistory()
    const {setUser, user} = useContext(AppContext)

    function handleClick() {
        fetch('/logout', { method: 'DELETE' })
        .then(() => {setUser(null); history.push('/')})
    }

    return (

        <ThemeProvider theme={theme}>
            <Container maxWidth="xl" sx={styles.secondBox}> 

                <Box>
                    <Typography color="text.primary" sx={styles.coName}>Your-Company-Name-Here</Typography>
                    <Typography color="text.secondary" sx={styles.cCoName}>Client-Company-Name-Here</Typography>
                </Box>

                <Box>
                    <Typography sx={styles.instructions}>Please drag and drop the appropriate document into the designated drop zone.</Typography>
                </Box>

                <DropZoneContainer/>

                {isMobile ? 
                    <Box sx={styles.boxMargin}>
                        <Box sx={styles.userBoxSm}>
                            <AccountCircleIcon  sx={styles.userIcon}/>
                            <Typography sx={styles.userName}>{user.name.length > 21 ? `${user.name.slice(0,21)}...` : user.name }</Typography>
                        </Box>
                        <Typography onClick={handleClick} sx={styles.logout}>Log out</Typography>
                    </Box>
                    : 
                    null
                }
                  
            </Container>
        </ThemeProvider>
       
    )
}
export default SubmissionsPage