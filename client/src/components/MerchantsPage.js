import React, { useState, useContext, useEffect, useMemo } from 'react'
import Big from 'big.js'
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
import { AppContext } from "./AppContext"
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 1200, md: 1500, lg: 1850 } } })

function MerchantsPage() {
    
    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const isSmScr = useMediaQuery('(max-width: 1230px)')
    
    const params = useParams()

    const { merchants, editMerchant } = useContext(AppContext)
    const modifiedName = params.name.replace(/-/g, ' ')
    
    const merchant = useMemo(
        () => merchants.find(merchant => merchant.merchants_legal_name_title_case === modifiedName) || {},
        [merchants, modifiedName]
    )

    const [data, setData] = useState({
        first_guarantor_title_case: '',
        email_address: '',
        mobile: '',
        business_phone: '',
        second_guarantor_title_case: '',
        second_guarantor_email: '',
        second_guarantor_phone: '',
        lawyer: '',
        lawyer_email: '',
        lawyer_phone: '',
        suit_status: '',
        litigation_date: '',
        response_date: '',
        balance: '',
        rtr_legal: '',
        total: '',
        remittance_formatted: '',
        six_month_payoff_date: '',
        service: '',
        aos: '',
        ucc_status: '',
        contract_payoff_date: ''
    })
    
    useEffect(() => {
        if (merchant) {
            setData({
                first_guarantor_title_case:   merchant.first_guarantor_title_case,
                email_address:                merchant.email_address,
                mobile:                       merchant.mobile,
                business_phone:               merchant.business_phone,
                second_guarantor_title_case:  merchant.second_guarantor_title_case,
                second_guarantor_email:       merchant.second_guarantor_email,
                second_guarantor_phone:       merchant.second_guarantor_phone,
                lawyer:                       merchant.lawyer,
                lawyer_email:                 merchant.lawyer_email,
                lawyer_phone:                 merchant.lawyer_phone,
                suit_status:                  merchant.suit_status,
                litigation_date:              merchant.litigation_date,
                response_date:                merchant.response_date,
                balance:                      merchant.balance,
                rtr_legal:                    merchant.rtr_legal,
                total:                        merchant.total,
                remittance_formatted:         merchant.remittance_formatted,
                six_month_payoff_date:        merchant.six_month_payoff_date,
                service:                      merchant.service,
                aos:                          merchant.aos,
                ucc_status:                   merchant.ucc_status,
                contract_payoff_date:         merchant.contract_payoff_date
            })
        }
    }, [merchant])
 
    function paybackAmounts(rowId) {
        const cleanedBalance = data.balance.replace(/[^\d.-]/g, '')
        const cleanedRtrLegal = data.rtr_legal.replace(/[^\d.-]/g, '')
        const cleanedTotal = data.total.replace(/[^\d.-]/g, '')

        const balanceToInt = parseInt(cleanedBalance)
        const rtrLegalToInt = parseInt(cleanedRtrLegal)
        const totalToInt = parseInt(cleanedTotal)
        
        const divisor = new Big('26')
        let balancePbAmount = merchant.balance_pb_amount
        let rtrLegalPbAmount = merchant.rtr_legal_pb_amount
        let totalPbAmount = merchant.total_pb_amount
        
        if (!isNaN(balanceToInt) && rowId === 13) {
            const dividend = new Big(cleanedBalance)
            const result = dividend.div(divisor)
            const number = result.toNumber()  
            const format = number.toLocaleString('en-US', { maximumFractionDigits: 3 })
            balancePbAmount = "$" + format
        }

        if (!isNaN(rtrLegalToInt) && rowId === 14) {
            const dividend = new Big(cleanedRtrLegal)
            const result = dividend.div(divisor)
            const number = result.toNumber()  
            const format = number.toLocaleString('en-US', { maximumFractionDigits: 3 })
            rtrLegalPbAmount = "$" + format
        }

        if (!isNaN(totalToInt) && rowId === 15) {
            const dividend = new Big(cleanedTotal)
            const result = dividend.div(divisor)
            const number = result.toNumber()  
            const format = number.toLocaleString('en-US', { maximumFractionDigits: 3 })
            totalPbAmount = "$" + format
        }
        
        return { balancePbAmount, rtrLegalPbAmount, totalPbAmount };
    }
    
    function handleSubmit(event, rowId) {
        event.preventDefault()
        const paybackAmountData = paybackAmounts(rowId)
        fetch(`/merchants/${merchant.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...data,
                first_guarantor:     data.first_guarantor_title_case.toUpperCase(),
                second_guarantor:    data.second_guarantor_title_case.toUpperCase(),
                balance_pb_amount:   paybackAmountData.balancePbAmount,
                rtr_legal_pb_amount: paybackAmountData.rtrLegalPbAmount,
                total_pb_amount:     paybackAmountData.totalPbAmount
            })
        })
        .then(response => response.json())
        .then(data => editMerchant(data))  
    }
    
    const handleChange =(event) => { setData({...data, [event.target.name]: event.target.value}) }
    
    const handleBsChange = (event) => { setData({...data, business_phone: event.target.value}) }

    const handleMbChange = (event) => { setData({...data, mobile: event.target.value}) }

    const leftGrid = [
        {
            id: 1,  
            key: 'Guarantor # 1 Name',
            name: 'first_guarantor_title_case',      
            value: data.first_guarantor_title_case
        },
        {
            id: 2,  
            key: 'Guarantor # 1 Email',  
            name: 'email_address',  
            value: data.email_address, 
        },
        {
            id: 3,  
            key: 'Guarantor # 1 Phone',    
            mobile: data.mobile,
            business: data.business_phone
        },
        {
            id: 4,  
            key: 'Guarantor # 2 Name',
            name: 'second_guarantor_title_case',       
            value: data.second_guarantor_title_case
        },
        {
            id: 5,  
            key: 'Guarantor # 2 Email',
            name: 'second_guarantor_email',
            value: data.second_guarantor_email
        },
        {
            id: 6,  
            key: 'Guarantor # 2 Phone', 
            name: 'second_guarantor_phone',    
            value: data.second_guarantor_phone
        },
        {
            id: 7,  
            key: 'Lawyer / Debt Settlement', 
            name: 'lawyer',
            value: data.lawyer
        },
        {
            id: 8,  
            key: 'Lawyer Email', 
            name: 'lawyer_email',           
            value: data.lawyer_email
        },
        {
            id: 9,  
            key: 'Lawyers Phone',
            name: 'lawyer_phone',
            value: data.lawyer_phone
        },
        {
            id: 10, 
            key: 'Lawsuit Status',
            name: 'suit_status',          
            value: data.suit_status
        },
        {
            id: 11, 
            key: 'Litigation Date', 
            name: 'litigation_date',         
            value: data.litigation_date
        },
        {
            id: 12, 
            key: 'Response Date', 
            name: 'response_date',           
            value: data.response_date
        },
    ]
        
    const rightGrid = [
        {
            id: 13, 
            key: 'RTR', 
            name: 'balance',
            value: data.balance
        },
        {
            id: 14, 
            key: 'RTR + Legal',
            name: 'rtr_legal', 
            value: data.rtr_legal
        },
        {
            id: 15, 
            key: 'Full', 
            name: 'total',
            value: data.total
        },
        {
            id: 16, 
            key: '6-month payback amount', 
            value: merchant.balance_pb_amount
        },
        {
            id: 17, 
            key: '6-month payback amount', 
            value: merchant.rtr_legal_pb_amount
        },
        {
            id: 18, 
            key: '6-month payback amount', 
            value: merchant.total_pb_amount
        },
        {
            id: 19, 
            key: 'Contract Payoff Date',
            name: 'contract_payoff_date', 
            value: data.contract_payoff_date
        },
        {
            id: 20, 
            key: 'Remittance', 
            value: data.remittance_formatted
        },
        {
            id: 21, 
            key: '6-month payoff date',
            name: 'six_month_payoff_date',
            value: data.six_month_payoff_date
        },
        {
            id: 22, 
            key: 'Service', 
            name: 'service',
            value: data.service
        },
        {
            id: 23, 
            key: 'Affidavit Of Service', 
            name: 'aos',
            value: data.aos
        },
        {
            id: 24, 
            key: 'UCC', 
            name: 'ucc_status',
            value: data.ucc_status
        },
    ]

    const merchantInfoGridLeft = leftGrid.map(row => (
        <MerchantInfoItem 
            key={row.id} 
            row={row} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            handleBsChange={handleBsChange}
            handleMbChange={handleMbChange}
        />
    ))

    const merchantInfoGridRight = rightGrid.map(row => (
        <MerchantInfoItem 
            key={row.id} 
            row={row} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            handleBsChange={handleBsChange}
            handleMbChange={handleMbChange}
        />
    ))
  
    return (
    
        <ThemeProvider theme={theme}>
            <Container style={{ maxWidth: isLgScr ? "2400px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>

                <Typography sx={styles.pageName}>{merchant.merchants_legal_name}</Typography>
                  
                <Box sx={styles.gridBox}>
                    <Grid container spacing={1} sx={styles.leftGrid}>{merchantInfoGridLeft}</Grid>
                    <Grid container spacing={1} sx={styles.rightGrid}>{merchantInfoGridRight}</Grid>
                </Box>

                <Divider />
                <MerchantOperations isSmScr={isSmScr} merchant={merchant} />

            </Container>
        </ThemeProvider>
    )
}
export default MerchantsPage