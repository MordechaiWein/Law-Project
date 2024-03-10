import React from 'react'
import styles from '../styles/MerchantDataStyles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function MerchantDataField({ row, handleChange, handleComputedChange, handleBlur }) {

    const computedKeys = [
        'RTR Payback Amount', 'RTR + Legal Payback Amount', 'Full Payback Amount', 'Default Judgment', 'Contract Payoff Date'
    ]

    return (

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack>
                <Typography sx={styles.datakey}>{row.key}</Typography>
                <TextField
                    size="small"
                    autoComplete='off'
                    InputProps={{style: styles.dataValue}}
                    placeholder={row.key === 'Payment Frequency' ? "Available options: Weekly, Daily" : ''}
                    onChange={computedKeys.includes(row.key) ? handleComputedChange : handleChange}
                    onBlur={() => handleBlur(row.id)} 
                    value={row.value}
                    name={row.name}
                />
            </Stack>
        </Grid>
    )
}
export default MerchantDataField