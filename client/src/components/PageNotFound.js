import React from "react"
import styles from '../styles/PageNotFoundStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

function PageNotFound() {
    
    const isLgScr = useMediaQuery('(min-width: 1850px)')

    return (

        <Container style={{ maxWidth: isLgScr ? "2400px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>
    
            <Box>
                <Typography sx={styles.Oops}>Oops!</Typography>
            </Box>

            <Container maxWidth="xl">
                <Divider />
            </Container>

            <Box sx={styles.notFoundBox}>
                <h1 style={styles.fourOFour}>404.</h1>
                <h1 style={styles.pageNotFound}>Page Not Found</h1>
            </Box>

            <Box>
                <Typography sx={styles.message}>Something went wrong and the page you're looking for cannot be found.</Typography>
            </Box>

            <Box>
                <Typography sx={styles.clickHere}>Click here to <Link to="/" style={styles.link}>return to the main page.</Link> </Typography>
            </Box>
             
        </Container>
    )
}
export default PageNotFound