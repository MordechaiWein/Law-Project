import React from 'react'
import styles from '../styles/MerchantStyles'
import MerchantInfoItem from '../pages/MerchantInfoItem'
import MerchantOperations from '../pages/MerchantOperations'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 1200, md: 1500, lg: 1850 } } })

function MerchantsPage() {

    const params = useParams()
    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const isSmScr = useMediaQuery('(max-width: 1230px)')

    const rowData = [{contact_name: 'Melinda Marie Brands', business: 'THE METAL BOX BROKERAGE LLC'}]
    
    const modifiedName = params.name.replace(/-/g, ' ')
    const merchant = rowData.find(row => row.contact_name === modifiedName)

    const leftGrid = [
        {id: 1, key: 'Guarantor # 1 Name', value: 'Martin Wein'},
        {id: 2, key: 'Guarantor # 1 Email', value: 'mordwein77@gmail.com'},
        {id: 3, key: 'Guarantor # 1 Phone', value: '917-745-6409'},
        {id: 4, key: 'Guarantor # 2 Name', value: 'Shimon Wein'},
        {id: 5, key: 'Guarantor # 2 Email', value: 'shimon@yahoo.com'},
        {id: 6, key: 'Guarantor # 2 Phone', value: '516-509-9788'},
        {id: 7, key: 'Lawyer / Debt Settlement', value: 'Allan Richard'},
        {id: 8, key: 'Lawyer Email', value: 'Alan@gmail.com'},
        {id: 9, key: 'Lawyers Phone', value: '212-667-9980'},
        {id: 10, key: 'Lawsuit Status', value: 'Filed'},
        {id: 11, key: 'Litigation Date', value: 'January 15th, 2024'},
        {id: 12, key: 'Response Date', value: 'January 20th 2024'},
    ]

    const rightGrid = [
        {id: 1, key: 'RTR', value: '$10,000'},
        {id: 2, key: 'RTR + Legal', value: '$15,000'},
        {id: 3, key: 'Full', value: '$27,500'},
        {id: 4, key: '6-month payback amount', value: '$1,200'},
        {id: 5, key: '6-month payback amount', value: '$1,500'},
        {id: 6, key: '6-month payback amount', value: '$1,700'},
        {id: 7, key: 'Contract Payoff Date', value: 'March 27, 2024'},
        {id: 8, key: 'Contract Payments', value: '$2,000 weekly'},
        {id: 9, key: '6-month payoff amount', value: 'June 26th,2024'},
        {id: 10, key: 'Service', value: 'Complete'},
        {id: 11, key: 'Affidavit Of Service', value: 'Complete'},
        {id: 12, key: 'UCC', value: 'Not yet done...'},
    ]

    const merchantInfoGridLeft = leftGrid.map(row => <MerchantInfoItem key={row.id} row={row}/>)
    const merchantInfoGridRight = rightGrid.map(row => <MerchantInfoItem key={row.id} row={row}/>)

    return (
    
        <ThemeProvider theme={theme}>
            <Container style={{ maxWidth: isLgScr ? "2400px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>

                <Typography sx={styles.pageName}>{merchant.business}</Typography>

                <Box sx={styles.gridBox}>
                    <Grid container spacing={1} sx={styles.leftGrid}>{merchantInfoGridLeft}</Grid>
                    <Grid container spacing={1} sx={styles.rightGrid}>{merchantInfoGridRight}</Grid>
                </Box>

                <Divider />
                <MerchantOperations isSmScr={isSmScr} />

            </Container>
        </ThemeProvider>
    )
}
export default MerchantsPage