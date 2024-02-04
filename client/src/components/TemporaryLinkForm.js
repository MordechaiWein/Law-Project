import React, { useState, useContext } from "react"
import styles from '../styles/TemporaryLinkFormStyles'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useMediaQuery } from '@mui/material'
import { AppContext } from "./AppContext"
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

function TemporaryLinkForm() {

    const [open, setOpen] = useState(true)
    const [data, setData] = useState( { name: '', email: '' } )
    const [errors, setErrors] = useState( { nameError: '', emailError: '' } )
    const [emailSuccess, setEmailSuccess] = useState('')
    const [emailError, setEmailError] = useState('')
    const { setSignUpFormVisible } = useContext(AppContext)
    const isMobile = useMediaQuery('(max-width: 700px)')
    
    const handleClose = () => { setOpen(false); setSignUpFormVisible(false); }

    function handleChange(event) {
        setErrors({ nameError: '', emailError: '' })
        setData({...data, [event.target.name] : event.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        const emailRegex = /^\w+[\w+.-]*@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i
        const nameError = data.name.length < 3 ? 'Please enter a valid name.' : ''
        const emailError = !emailRegex.test(data.email) ? 'Please enter a valid email.' : ''

        setErrors({ nameError, emailError })
    
        if (!nameError && !emailError) {
            fetch('/one-time-signup-link', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => setEmailSuccess(data.success))
                } else {
                    response.json().then(data => setEmailError(data.error))
                }
            })
            setData({ name: '', email: '' })
            setTimeout(() =>  setEmailSuccess(''), 4000)
            setTimeout(() =>  setEmailError(''), 4000)
        }
    }

    return (
    
        <Dialog maxWidth="xs" onClose={handleClose} open={open} PaperProps={{sx: isMobile ? styles.dlgSm : styles.dlgLg }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography sx={styles.title}>Send Temporary Sign-Up Link</Typography>
            
                <Typography sx={styles.description}>
                    Send a one-time, temporary registration link to an intended individual by filling out the form below.
                </Typography>

                <Typography sx={styles.label}>Recipient's Name</Typography>
                <TextField 
                    fullWidth 
                    InputProps={{style: styles.textField}}
                    error={errors.nameError ? true : false}
                    autoComplete="off"
                    onChange={handleChange}
                    name="name"
                    value={data.name}
                />
                <Typography sx={styles.errors}>{errors.nameError ?  errors.nameError : ""}</Typography>

                <Typography sx={styles.label}>Recipient's Email</Typography>
                <TextField 
                    fullWidth   
                    InputProps={{style: styles.textField}}
                    error={errors.emailError ? true : false}
                    autoComplete="off"
                    onChange={handleChange}
                    name="email"
                    value={data.email}
                />
                <Typography sx={styles.errors}>{errors.emailError ?  errors.emailError : ""}</Typography>

                <Button type="submit" disableRipple variant="contained" fullWidth sx={styles.button}>Send Link</Button>
                
                <Typography sx={styles.emailSuccess}>{emailSuccess}</Typography>

                <Stack direction='row'>
                    { emailError ? <ReportGmailerrorredIcon sx={styles.errorIcon}/> : null }
                    <Typography sx={styles.emailError}>{emailError}</Typography>
                </Stack>
            </Box>
        </Dialog>
    )
}
export default TemporaryLinkForm