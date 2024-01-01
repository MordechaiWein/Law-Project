import React from 'react'
import styles from '../styles/AppStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme({ palette: { primary: { main: '#000000' }, secondary: { main: '#00559A' } } })

function SignIn() {

    return(

        <ThemeProvider theme={defaultTheme}>
            <Container sx={styles.parentContainer} maxWidth={false}>
                <Container sx={styles.container}>

                    <Box sx={styles.box}>
                        <Typography variant="h4" sx={styles.signIn}>Sign in portal</Typography>

                        <Typography sx={styles.name}>Name:</Typography>
                        <TextField fullWidth InputProps={{style: styles.textField}}/>

                        <Typography sx={styles.password}>Password:</Typography>
                        <TextField fullWidth type="password" InputProps={{style: styles.textField}}/>

                        <Button disableRipple fullWidth sx={styles.button} variant="contained" color="secondary">Sign in</Button>
                        
                        <Typography sx={styles.rules}>
                           Sign-in only. For registration inquiries, contact 
                           the <a style={styles.administrator} href="mailto:your-name-here@gmail.com">administrator</a>. Thank you.
                        </Typography>
                    </Box>

                </Container>
            </Container>
        </ThemeProvider>
    )
}

   
export default SignIn