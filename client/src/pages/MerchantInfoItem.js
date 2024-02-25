import React from 'react'
import styles from '../styles/MerchantStyles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

function MerchantInfoItem({row, handleChange, handleSubmit, handleBsChange, handleMbChange }) {
    
    return (
    
        <Grid item sx={styles.item} xs={12} sm={6} md={4} lg={4}>
            {row.key === "Guarantor # 1 Phone" ?
                <>
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <Stack direction="row"> 
                        <TextField 
                            autoComplete='off'
                            fullWidth 
                            value={row.mobile ? row.mobile : ''}
                            onChange={handleMbChange}
                            onKeyDown={ (event) => { if (event.key === 'Enter') { handleSubmit(event, row.id) } } }
                            InputProps={{style: styles.value, startAdornment: (<InputAdornment position="start">Mb:</InputAdornment>) }}
                        /> 
                        <TextField 
                            autoComplete='off'
                            fullWidth 
                            value={row.business ? row.business : ''}
                            onChange={handleBsChange}
                            onKeyDown={ (event) => { if (event.key === 'Enter') { handleSubmit(event, row.id) } } }
                            InputProps={{style: styles.value, startAdornment: (<InputAdornment position="start">Bs:</InputAdornment>) }}
                        />     
                    </Stack>
                </>
                :
                <Stack direction="column"> 
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <TextField 
                        autoComplete='off'
                        fullWidth 
                        InputProps={{style: styles.value}} 
                        value={row.value ? row.value : ''}
                        name={row.name}
                        onChange={handleChange}
                        onKeyDown={ (event) => { if (event.key === 'Enter') { handleSubmit(event, row.id) } } }
                    />    
                </Stack>
            }
        </Grid>  
    )
}
export default MerchantInfoItem