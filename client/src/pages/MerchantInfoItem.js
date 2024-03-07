import React from 'react'
import styles from '../styles/MerchantStyles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

function MerchantInfoItem({row}) {
    
    return (
    
        <Grid item sx={styles.item} xs={12} sm={6} md={4} lg={4}>
            {row.key === "Guarantor # 1 Phone" ?
                <>
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <Stack direction="row"> 
                        <TextField 
                            fullWidth 
                            value={row.mobile ? row.mobile : ''}
                            InputProps={{
                                style: styles.value, 
                                readOnly: true,
                                startAdornment: (<InputAdornment position="start">Mb:</InputAdornment>) 
                            }}
                        /> 
                        <TextField 
                            fullWidth 
                            value={row.business ? row.business : ''}
                            InputProps={{
                                style: styles.value, 
                                readOnly: true,
                                startAdornment: (<InputAdornment position="start">Bs:</InputAdornment>) 
                            }}
                        />     
                    </Stack>
                </>
                :
                <Stack direction="column"> 
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <TextField 
                        fullWidth 
                        InputProps={{style: styles.value, readOnly: true}} 
                        value={row.value ? row.value : ''}
                    />    
                </Stack>
            }
        </Grid>  
    )
}
export default MerchantInfoItem