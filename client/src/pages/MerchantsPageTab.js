import React from 'react'
import styles from '../styles/MerchantStyles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function MerchantsPageTab({row}) {
    
    return (
    
        <Grid item sx={styles.item} xs={12} sm={6} md={4} lg={4}>
            {row.key === "Guarantor # 1 Phone" ?
                <>
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <Stack direction="row"> 
                        <TextField 
                            fullWidth 
                            value={row.mobile ? row.mobile : ''}
                            InputProps={{style: styles.value, readOnly: true}}
                        /> 
                        <TextField 
                            fullWidth 
                            value={row.business ? row.business : ''}
                            InputProps={{style: styles.value, readOnly: true}}
                        />     
                    </Stack>
                </>
                :
                <Stack direction="column"> 
                    <Typography sx={styles.key}>{row.key}</Typography>
                    <TextField
                        fullWidth 
                        value={row.value ? row.value : ''}
                        InputProps={{style: styles.value, readOnly: true}} 
                    />  
                </Stack>
            }
        </Grid>  
    )
}
export default MerchantsPageTab