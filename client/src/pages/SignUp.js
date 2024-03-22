// import React, { useState, useContext, useEffect } from 'react'
// import styles from '../styles/SignUpStyles'
// import InvalidToken from './InvalidToken'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { AppContext } from "../components/AppContext"
// import { useHistory } from "react-router-dom"

// const defaultTheme = createTheme({ palette: { primary: { main: '#00559A' } } })

// function SignUp({ pathname }) {

//     const history = useHistory()
//     const { setUser } = useContext(AppContext)
    
//     // Component States...
//     const [isLoading, setIsLoading] = useState(true)
//     const [tokenValid, setTokenValid] = useState(null)
//     const [errors, setErrors] = useState([]) 
//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         company_name: '',
//         password: '',
//         password_confirmation: '',
//         token: pathname.slice(1)
//     })

//     // On component mount, perform an initial check to determine the validity of the token. //
//     useEffect(() => {
//         setIsLoading(true)
//         fetch('/signup-link-confirmation', {
//             method: 'POST',
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({pathname: pathname.slice(1)})
//         })
//         .then((response) => {
//             if (response.ok) { setTokenValid(true); setIsLoading(false); } 
//             else { setIsLoading(false) }
//         })
//     },[pathname])
//     // ------------------------------------------------------------------------------------- //
    
//     function handleSubmit(e) {
//         e.preventDefault()
//         fetch('/signup', {
//           method: 'POST',
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify(data)
//         })
//         .then((response) => {
//             if (response.ok) {
//                 response.json().then(data => { setUser(data); history.push('/'); })
//             } else {
//                 response.json().then(data => { data.errors && setErrors(data.errors) })    
//             }
//         })
//     }

//     function handleChange(event) {
//         setErrors([])
//         setData({...data, [event.target.name] : event.target.value})
//     }
    
//     // If the token is valid render the Signup page, if it is not render the Invalid token page. //
//     if (isLoading) return <div></div>
//     if (!tokenValid) return <InvalidToken />

//     return (

//         <ThemeProvider theme={defaultTheme}>
//             <Container sx={styles.parentContainer} maxWidth={false}>
//                 <Container sx={styles.container}>

//                     <Container maxWidth="xs">
//                         <Divider sx={styles.logo}>Your Logo Here</Divider>
//                     </Container>
                    
//                     <Box sx={styles.box} component="form" onSubmit={handleSubmit}>
//                         <Typography variant="h4" sx={styles.signUp}>Create account</Typography>

//                         <Typography sx={styles.name}>Your Name</Typography>
//                         <TextField 
//                             fullWidth 
//                             error={errors.name ? true : false}
//                             InputProps={{style: styles.textField}}
//                             onChange={handleChange}
//                             placeholder='First and last name'
//                             size="small"
//                             name="name"
//                             value={data.name}
//                         />
//                         {errors.name ? <Typography sx={styles.errors}>{errors.name[0]}</Typography> : ''}

//                         <Typography sx={styles.label}>Email</Typography>
//                         <TextField 
//                             fullWidth 
//                             error={errors.email ? true : false}
//                             InputProps={{style: styles.textField}}
//                             onChange={handleChange}
//                             size="small"
//                             name="email"
//                             value={data.email}
//                         />
//                         {errors.email ? <Typography sx={styles.errors}>{errors.email[0]}</Typography> : ''}

//                         <Typography sx={styles.label}>Company Name</Typography>
//                         <TextField 
//                             fullWidth 
//                             error={errors.company_name ? true : false}
//                             InputProps={{style: styles.textField}}
//                             onChange={handleChange}
//                             size="small"
//                             name="company_name"
//                             autoComplete="off"
//                             value={data.company_name}
//                         />
//                         {errors.company_name ? <Typography sx={styles.errors}>{errors.company_name[0]}</Typography> : ''}

//                         <Typography sx={styles.label}>Password</Typography>
//                         <TextField
//                             fullWidth 
//                             error={errors.password ? true : false }
//                             InputProps={{style: styles.textField}}
//                             onChange={handleChange}
//                             size="small"
//                             placeholder='At least 8 characters'
//                             name="password"
//                             type="password" 
//                             value={data.password}
//                         />
//                         {errors.password ? <Typography sx={styles.errors}>{errors.password[0]}</Typography> : ''}

//                         <Typography sx={styles.label}>Re-enter password</Typography>
//                         <TextField 
//                             fullWidth 
//                             error={errors.password_confirmation ? true : false}
//                             InputProps={{style: styles.textField}}
//                             onChange={handleChange}
//                             size="small"
//                             name="password_confirmation"
//                             type="password" 
//                             value={data.password_confirmation}
//                         />
//                         {errors.password_confirmation ? <Typography sx={styles.errors}>{errors.password_confirmation[0]}</Typography> : ''}

//                         <Button disableRipple fullWidth sx={styles.button} type="submit" variant="contained">Sign Up</Button>

//                         <Typography sx={styles.rules}>
//                             Your signup link will expire shortly. Please sign up promptly. Thank you.
//                         </Typography>  
//                     </Box>
                    
//                 </Container>
//             </Container>
//         </ThemeProvider>
//     )
// }
// export default SignUp








import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/SignUpStyles'
import InvalidToken from './InvalidToken'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppContext } from "../components/AppContext"
import { useHistory, useLocation } from "react-router-dom"

const defaultTheme = createTheme({ palette: { primary: { main: '#00559A' } } })

function SignUp() {

    const history = useHistory()
    const { pathname } = useLocation()
    const { setUser } = useContext(AppContext)
    
    // Component States...
    const [isLoading, setIsLoading] = useState(true)
    const [tokenValid, setTokenValid] = useState(null)
    const [errors, setErrors] = useState([]) 
    const [data, setData] = useState({
        name: '',
        email: '',
        company_name: '',
        password: '',
        password_confirmation: '',
        token: pathname.slice(1)
    })

    // On component mount, perform an initial check to determine the validity of the token. //
    useEffect(() => {
        setIsLoading(true)
        fetch('/signup-link-confirmation', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({pathname: pathname.slice(1)})
        })
        .then((response) => {
            if (response.ok) { setTokenValid(true); setIsLoading(false); } 
            else { setIsLoading(false) }
        })
    },[pathname])
    // ------------------------------------------------------------------------------------- //
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch('/signup', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => { setUser(data); history.push('/'); })
            } else {
                response.json().then(data => { data.errors && setErrors(data.errors) })    
            }
        })
    }

    function handleChange(event) {
        setErrors([])
        setData({...data, [event.target.name] : event.target.value})
    }
    
    // If the token is valid render the Signup page, if it is not render the Invalid token page. //
    if (isLoading) return <div></div>
    if (!tokenValid) return <InvalidToken />

    return (

        <ThemeProvider theme={defaultTheme}>
            <Container sx={styles.parentContainer} maxWidth={false}>
                <Container sx={styles.container}>

                    <Container maxWidth="xs">
                        <Divider sx={styles.logo}>Your Logo Here</Divider>
                    </Container>
                    
                    <Box sx={styles.box} component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" sx={styles.signUp}>Create account</Typography>

                        <Typography sx={styles.name}>Your Name</Typography>
                        <TextField 
                            fullWidth 
                            error={errors.name ? true : false}
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            placeholder='First and last name'
                            size="small"
                            name="name"
                            value={data.name}
                        />
                        {errors.name ? <Typography sx={styles.errors}>{errors.name[0]}</Typography> : ''}

                        <Typography sx={styles.label}>Email</Typography>
                        <TextField 
                            fullWidth 
                            error={errors.email ? true : false}
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            size="small"
                            name="email"
                            value={data.email}
                        />
                        {errors.email ? <Typography sx={styles.errors}>{errors.email[0]}</Typography> : ''}

                        <Typography sx={styles.label}>Company Name</Typography>
                        <TextField 
                            fullWidth 
                            error={errors.company_name ? true : false}
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            size="small"
                            name="company_name"
                            autoComplete="off"
                            value={data.company_name}
                        />
                        {errors.company_name ? <Typography sx={styles.errors}>{errors.company_name[0]}</Typography> : ''}

                        <Typography sx={styles.label}>Password</Typography>
                        <TextField
                            fullWidth 
                            error={errors.password ? true : false }
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            size="small"
                            placeholder='At least 8 characters'
                            name="password"
                            type="password" 
                            value={data.password}
                        />
                        {errors.password ? <Typography sx={styles.errors}>{errors.password[0]}</Typography> : ''}

                        <Typography sx={styles.label}>Re-enter password</Typography>
                        <TextField 
                            fullWidth 
                            error={errors.password_confirmation ? true : false}
                            InputProps={{style: styles.textField}}
                            onChange={handleChange}
                            size="small"
                            name="password_confirmation"
                            type="password" 
                            value={data.password_confirmation}
                        />
                        {errors.password_confirmation ? <Typography sx={styles.errors}>{errors.password_confirmation[0]}</Typography> : ''}

                        <Button disableRipple fullWidth sx={styles.button} type="submit" variant="contained">Sign Up</Button>

                        <Typography sx={styles.rules}>
                            Your signup link will expire shortly. Please sign up promptly. Thank you.
                        </Typography>  
                    </Box>
                    
                </Container>
            </Container>
        </ThemeProvider>
    )
}
export default SignUp