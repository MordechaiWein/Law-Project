import React from 'react'
import styles from '../styles/MerchantStyles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function MerchantInfoItem({ row }) {

    return (

        <Grid item sx={styles.item} xs={12} sm={6} md={4} lg={4}>
            <Stack direction="column"> 

                <Typography sx={styles.key}>{row.key}</Typography>
                
                <TextField InputProps={{style: styles.value}} value={row.value}/>

            </Stack>
        </Grid>
    )
}
export default MerchantInfoItem