import React, { useState, useContext } from 'react'
import styles from '../styles/NameCellRendererStyles'
import { AppContext } from "./AppContext"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme({ palette: { primary: { main: '#d32f2f' } } })

function NameCellRenderer(params) {

    const {merchants, setMerchants} = useContext(AppContext)

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    function handleContextMenu(event) {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    function handleDelete() {
        fetch(`/merchants/${params.data.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            setMerchants(merchants.filter(merchant => merchant.id !== data.id))
            setAnchorEl(null) 
        })
    }

    const handleClose = () => { setAnchorEl(null) }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box onContextMenu={handleContextMenu}>{params.value}</Box>

            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'center', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
            >

                <Container disableGutters sx={styles.container}>

                    <Typography sx={styles.header}>Confirm Delete?</Typography>
                    <Button 
                        disableRipple 
                        variant="contained"
                        startIcon={<DeleteOutlinedIcon />} 
                        sx={styles.button}
                        onClick={handleDelete} 
                    >
                        Delete Merchant
                    </Button>

                </Container> 

            </Popover>    
        </ThemeProvider>
    )
}
export default NameCellRenderer