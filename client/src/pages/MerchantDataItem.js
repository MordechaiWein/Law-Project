import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function MerchantDataItem({ row, handleChange, handleSubmit, handlePaybacksChange }) {

    const paybackAmounts = [
        'RTR Payback Amount', 
        'RTR + Legal Payback Amount', 
        'Full Payback Amount', 
        'Default Judgment', 
        'Contract Payoff Date'
    ]

    return (

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack>
                <Typography>{row.key}</Typography>
                <TextField
                    autoComplete='off'
                    size="small"
                    InputProps={{style: {fontSize: '0.8rem'}}}
                    placeholder={row.key === 'Payment Frequency' ? "Available options: Weekly, Daily" : ''}
                    onChange={paybackAmounts.includes(row.key) ? handlePaybacksChange : handleChange}
                    onBlur={() => handleSubmit(row.id)} 
                    value={row.value}
                    name={row.name}
                />
            </Stack>
        </Grid>
    )
}
export default MerchantDataItem