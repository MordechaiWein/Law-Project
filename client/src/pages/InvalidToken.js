import React from "react"
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import styles from '../styles/SignUpStyles'

function InvalidToken() {

    return (

        <Container sx={styles.invalidContainer}>

            <Typography sx={styles.fourOFour}>404.</Typography>
            <Typography sx={styles.message}>An error occurred and the page you are looking for could not be found.</Typography>
            
        </Container>
    )
}
export default InvalidToken