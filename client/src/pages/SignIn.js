import React, { useState, useContext } from 'react'
import { AppContext } from "../components/AppContext"
import styles from '../styles/SignInStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme({ palette: { primary: { main: '#00559A' } } })

function SignIn() {

    const {setUser} = useContext(AppContext)
    const [error, setError] = useState('')
    const [data, setData] = useState( { name: '', password: '' } )

    function handleChange(event) {
        setError('')
        setData({...data, [event.target.name]: event.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/signin', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then((response) => {
          if (response.ok) {
            response.json().then(data => setUser(data))
          } else {
            response.json().then(data => setError(data.error))
          }
        })
    }
 
    return ( 

        <ThemeProvider theme={defaultTheme}>
            <Container sx={styles.parentContainer} maxWidth={false}>
                <Container sx={styles.container}>
  
                    <Container maxWidth="xs">
                        <Divider sx={styles.logo}>Your Logo Here</Divider>
                    </Container>
                   
                    <Box sx={styles.box} component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" sx={styles.signIn}>Sign in portal</Typography>

                        <Typography sx={styles.name}>Name</Typography>
                        <TextField 
                            error={error ? true : false}
                            fullWidth 
                            InputProps={{style: styles.textField}}
                            autoComplete="off"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                        />

                        <Typography sx={styles.password}>Password</Typography>
                        <TextField 
                            error={error ? true : false}
                            fullWidth 
                            type="password" 
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            name="password"
                            value={data.password}
                        />

                        <Typography sx={styles.error}>{error}</Typography>

                        <Button disableRipple fullWidth sx={styles.button} variant="contained" type="submit">Sign in</Button>
                    
                        <Typography sx={styles.rules}>
                           Sign-in only. For registration inquiries, contact 
                           the <Link sx={styles.administrator} href="mailto:your-name-here@gmail.com">administrator</Link>. Thank you.
                        </Typography>
                    </Box>

                </Container>
            </Container>
        </ThemeProvider>
    )
}
export default SignIn