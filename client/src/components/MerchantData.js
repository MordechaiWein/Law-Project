import React, { useState, useEffect, useContext } from "react"
import MerchantDataField from "../pages/MerchantDataField"
import styles from "../styles/MerchantStyles"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { AppContext } from "./AppContext"
import Big from 'big.js'

function MerchantData({ merchant, setDataPageFlag }) {

    // Context.
    const { editMerchant } = useContext(AppContext)

    // States.
    const [computedData, setComputedData] = useState({
        balancePayback:   '',
        rtrLegalPayback:  '',
        totalPayback:     '',
        defJudgment:      '',
        contractPayDate:  ''
    })

    const [data, setData] = useState({
        agreement_date:                  '',
        aos:                             '',
        balance:                         '',
        business_phone:                  '',
        city_title_case:                 '',
        contact_name:                    '',
        created:                         '',
        d_b_a_title_case:                '',
        damages:                         '',
        date_served:                     '',
        default_date:                    '',
        email_address:                   '',
        federal_tax_id:                  '',
        first_guarantor_title_case:      '',
        image_date:                      '',
        law_firm:                        '',
        lawyer:                          '',
        lawyer_email:                    '',
        lawyer_phone:                    '',
        legal:                           '',
        lender_legal_name_title_case:    '',
        litigation_date:                 '',
        mail_title_case:                 '',
        merchants_legal_name:            '',
        merchants_legal_name_title_case: '',
        mobile:                          '',
        notes:                           '',
        payment_frequency:               '',
        physical_address:                '',
        physical_city:                   '',
        physical_state:                  '',
        physical_zip:                    '',
        purchase_price:                  '',
        purchased_amount:                '',
        purchased_percentage:            '',
        remittance:                      '',
        response_date:                   '',
        rtr_legal:                       '',
        second_guarantor_email:          '',
        second_guarantor_phone:          '',
        second_guarantor_title_case:     '',
        service:                         '',
        six_month_payoff_date:           '',
        state:                           '',
        state_of_incorporation:          '',
        suit_status:                     '',
        total:                           '',
        type_of_entity:                  '',
        ucc_status:                      '',
        zip:                             ''
    })

    useEffect(() => {
        if(merchant) {
            setComputedData({
                balancePayback:   merchant.balance_pb_amount,
                rtrLegalPayback:  merchant.rtr_legal_pb_amount,
                totalPayback:     merchant.total_pb_amount,
                defJudgment:      merchant.default_judgment,
                contractPayDate:  merchant.contract_payoff_date
            })
        }
    },[merchant])

    useEffect(() => {
        if (merchant) {
            setData({
                agreement_date:                  merchant.agreement_date,
                aos:                             merchant.aos,
                balance:                         merchant.balance,
                business_phone:                  merchant.business_phone,
                city_title_case:                 merchant.city_title_case,
                contact_name:                    merchant.contact_name,
                created:                         merchant.created,
                d_b_a_title_case:                merchant.d_b_a_title_case,
                damages:                         merchant.damages,
                date_served:                     merchant.date_served,
                default_date:                    merchant.default_date,
                email_address:                   merchant.email_address,
                federal_tax_id:                  merchant.federal_tax_id,
                first_guarantor_title_case:      merchant.first_guarantor_title_case,
                image_date:                      merchant.image_date,
                law_firm:                        merchant.law_firm,
                lawyer:                          merchant.lawyer,
                lawyer_email:                    merchant.lawyer_email,
                lawyer_phone:                    merchant.lawyer_phone,
                legal:                           merchant.legal,
                lender_legal_name_title_case:    merchant.lender_legal_name_title_case,
                litigation_date:                 merchant.litigation_date,
                mail_title_case:                 merchant.mail_title_case,
                merchants_legal_name:            merchant.merchants_legal_name,  
                merchants_legal_name_title_case: merchant.merchants_legal_name_title_case,
                mobile:                          merchant.mobile,
                notes:                           merchant.notes,
                payment_frequency:               merchant.payment_frequency,
                physical_address:                merchant.physical_address,
                physical_city:                   merchant.physical_city,
                physical_state:                  merchant.physical_state,
                physical_zip:                    merchant.physical_zip,
                purchase_price:                  merchant.purchase_price,
                purchased_amount:                merchant.purchased_amount,
                purchased_percentage:            merchant.purchased_percentage,
                remittance:                      merchant.remittance,
                response_date:                   merchant.response_date,
                rtr_legal:                       merchant.rtr_legal,
                second_guarantor_email:          merchant.second_guarantor_email,
                second_guarantor_phone:          merchant.second_guarantor_phone,
                second_guarantor_title_case:     merchant.second_guarantor_title_case,
                service:                         merchant.service,
                six_month_payoff_date:           merchant.six_month_payoff_date,
                state:                           merchant.state,
                state_of_incorporation:          merchant.state_of_incorporation,
                suit_status:                     merchant.suit_status,
                total:                           merchant.total,
                type_of_entity:                  merchant.type_of_entity,
                ucc_status:                      merchant.ucc_status,
                zip:                             merchant.zip
            })
        }
    },[merchant])

    // Variables.

    const entityArr = data.type_of_entity.split(" ")
    const entityArrayFormatted = entityArr[entityArr.length -1].includes("LLC") ? entityArr.slice(0, -1) : entityArr
    const typeOfEntityNoLlc = entityArrayFormatted.join(" ").toLowerCase()

    // Date Regex Pattern.
    const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/

    // Date formatting options.
    const options = {month: '2-digit', day: '2-digit', year: '2-digit'}

    // let variables.
    let balancePaybackAmount  =  computedData.balancePayback
    let rtrLegalPaybackAmount =  computedData.rtrLegalPayback
    let totalPaybackAmount    =  computedData.totalPayback 
    let defaultJudgment       =  computedData.defJudgment
    let contractPayoffDate    =  computedData.contractPayDate 

    // Functions.

    // Calculate the Contract Payoff Date...
    function calculatePayoffDate(purchasedAmount, paymentFrequency, remittance) {
        const agreementDate= new Date(data.agreement_date)

        const cleanedPurchasedAmount = purchasedAmount.replace(/[^\d.-]/g, '')
        const cleanedRemittance = remittance.replace(/[^\d.-]/g, '')

        const purchasedAmtNum = parseInt(cleanedPurchasedAmount)
        const remittanceNum = parseInt(cleanedRemittance)
        const ratio = purchasedAmtNum / remittanceNum

        const wholeNumber = Math.round(ratio)

        if(paymentFrequency.toLowerCase() === "weekly") {
            agreementDate.setDate(agreementDate.getDate() +  wholeNumber * 7)
            const payoffDate = agreementDate.toLocaleDateString('en-US', options)
            return payoffDate
        }
        else if (paymentFrequency.toLowerCase() === "daily") {
            agreementDate.setDate(agreementDate.getDate() +  wholeNumber)
            const payoffDate = agreementDate.toLocaleDateString('en-US', options)
            return payoffDate
        }
        else { return "Invalid Date" }
    }

    // Calculate the Default Judgment date ( 35 days after 'date served' )...
    function calculateDefaultJudgment(dateServed) {
        if (dateServed.match(dateRegex)) {
            const servedDate = new Date(dateServed)
            servedDate.setDate(servedDate.getDate() + 35)
            const defaultJudgmentDate = servedDate.toLocaleDateString('en-US', options)
            return defaultJudgmentDate
        }  
        else { return 'Not a date...' }
    }

    // Calculate Payback Amounts (amount divided by 26)...
    function calculatePaybackAmount(amount) {
        const divisor = new Big('26')
        const cleanedAmount = amount.replace(/[^\d.-]/g, '')
        const amountToInt = parseInt(cleanedAmount)
        if (!isNaN(amountToInt)) {
            const dividend = new Big(cleanedAmount)
            const result = dividend.div(divisor)
            const number = result.toNumber() 
            const format = number.toLocaleString('en-US', { maximumFractionDigits: 3 })
            return format
        } 
        else { return null }
    }

    // Upon 'Blur' update specific fields based on other fields...
    function updateMerchantData(rowId) {
        if (rowId === 37) {
            const res = calculatePaybackAmount(data.balance) 
            balancePaybackAmount = !isNaN(res) ? balancePaybackAmount : "$" + res
        }
        if (rowId === 39) {
            const res = calculatePaybackAmount(data.rtr_legal)
            rtrLegalPaybackAmount = !isNaN(res) ? rtrLegalPaybackAmount :  "$" + res 
        }
        if (rowId === 41) {
            const res = calculatePaybackAmount(data.total)
            totalPaybackAmount = !isNaN(res) ? totalPaybackAmount : "$" + res
        }
        if (rowId === 34) {
            const res = calculateDefaultJudgment(data.date_served)
            defaultJudgment = res.match(dateRegex) ? res : defaultJudgment
        }
        if (rowId === 24 || rowId === 25 || rowId === 44) {
            const res = calculatePayoffDate(data.purchased_amount, data.payment_frequency, data.remittance)
            contractPayoffDate = res === "Invalid Date" ? contractPayoffDate : res
        }
    }

    // Send PATCH request to the backend...
    function handleBlur(rowId) {
        updateMerchantData(rowId)
        fetch(`/merchants/${merchant.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...data,
                city:                    data.city_title_case.toUpperCase(),
                d_b_a:                   data.d_b_a_title_case.toUpperCase(),
                first_guarantor:         data.first_guarantor_title_case.toUpperCase(),
                lender_legal_name:       data.lender_legal_name_title_case.toUpperCase(),
                mailing_address:         data.mail_title_case.toUpperCase(),
                second_guarantor:        data.second_guarantor_title_case.toUpperCase(),
                type_of_entity_no_llc:   typeOfEntityNoLlc,
                balance_pb_amount:       balancePaybackAmount,
                rtr_legal_pb_amount:     rtrLegalPaybackAmount,
                total_pb_amount:         totalPaybackAmount, 
                default_judgment:        defaultJudgment,
                contract_payoff_date:    contractPayoffDate
            })
        })
        .then(response => response.json())
        .then(data => editMerchant(data))  
    }

    // Update fields dynamically.
    const handleChange = (event) => { setData({...data, [event.target.name]: event.target.value}) }

    const handleComputedChange = (event) => { setComputedData({...computedData, [event.target.name]: event.target.value}) }

    // gridarray = An 'ARRAY' of 'OBJECTS' to be mapped through to create a grid item 'COMPONENT for each...
    const gridArray = [
        {
            id: 1,  
            key: 'Guarantor # 1 - Name',
            name: 'first_guarantor_title_case',      
            value: data.first_guarantor_title_case
        },
        {
            id: 2,
            key: 'Guarantor # 1 - Mobile',
            name: 'mobile',
            value: data.mobile
        },
        {
            id: 3,
            key: 'Guarantor # 1 - Business Phone',
            name: 'business_phone',
            value: data.business_phone
        },
        {
            id: 4,  
            key: 'Guarantor # 1 - Email',  
            name: 'email_address',  
            value: data.email_address, 
        },
        {
            id: 5,
            key: 'Agreement Dated',
            name: 'agreement_date',
            value: data.agreement_date
        },
        {
            id: 6,
            key: 'Date Submitted',
            name: 'created',
            value: data.created
        },
        {
            id: 7,
            key: 'Lender Legal Name',
            name: 'lender_legal_name_title_case',
            value: data.lender_legal_name_title_case
        },
        {
            // **** This field cannot be edited **** //
            id: 8,
            key: 'Merchants Legal Name',
            value: data.merchants_legal_name_title_case
        },
        {
            id: 9,
            key: 'D.B.A',
            name: 'd_b_a_title_case',
            value: data.d_b_a_title_case
        },
        {
            id: 10,
            key: 'Type of Entity',
            name: 'type_of_entity',
            value: data.type_of_entity
        },
        {
            id: 11,
            key: 'State of Incorporation',
            name: 'state_of_incorporation',
            value: data.state_of_incorporation
        },
        {
            id: 12,
            key: 'Federal Tax ID',
            name: 'federal_tax_id',
            value: data.federal_tax_id
        },
        {
            id: 13,
            key: 'Contact Name',
            name: 'contact_name',
            value: data.contact_name
        },
        {
            id: 14,
            key: 'Mailing Address',
            name: 'mail_title_case',
            value: data.mail_title_case
        },
        {
            id: 15,
            key: 'City',
            name: 'city_title_case',
            value: data.city_title_case
        },
        {
            id: 16,
            key: 'State',
            name: 'state',
            value: data.state
        },
        {
            id: 17,
            key: 'Zip',
            name: 'zip',
            value: data.zip
        },
        {
            id: 18,
            key: 'Physical Address',
            name: 'physical_address',
            value: data.physical_address
        },
        {
            id: 19,
            key: 'Physical City',
            name: 'physical_city',
            value: data.physical_city
        },
        {
            id: 20,
            key: 'Physical State',
            name: 'physical_state',
            value: data.physical_state
        },
        {
            id: 21,
            key: 'Physical Zip',
            name: 'physical_zip',
            value: data.physical_zip
        },
        {
            id: 22,
            key: 'Purchase Price',
            name: 'purchase_price',
            value: data.purchase_price
        },
        {
            id: 23,
            key: 'Purchased Percentage',
            name: 'purchased_percentage',
            value: data.purchased_percentage
        },
        {
            id: 24,
            key: 'Purchased Amount',
            name: 'purchased_amount',
            value: data.purchased_amount
        },
        {
            id: 25,
            key: 'Payment Frequency',
            name: 'payment_frequency',
            value: data.payment_frequency
        },
        {
            id: 26,  
            key: 'Guarantor # 2 - Name',
            name: 'second_guarantor_title_case',       
            value: data.second_guarantor_title_case
        },
        {
            id: 27,  
            key: 'Guarantor # 2 - Phone', 
            name: 'second_guarantor_phone',    
            value: data.second_guarantor_phone
        },
        {
            id: 28,  
            key: 'Guarantor # 2 - Email',
            name: 'second_guarantor_email',
            value: data.second_guarantor_email
        },
        {
            id: 29,
            key: 'Law Firm',
            name: 'law_firm',
            value: data.law_firm
        },
        { 
            id: 30,
            key: 'Lawyer',
            name: 'lawyer',
            value: data.lawyer
        },
        {
            id: 31,  
            key: 'Lawyer Email', 
            name: 'lawyer_email',           
            value: data.lawyer_email
        },
        {
            id: 32,  
            key: 'Lawyers Phone',
            name: 'lawyer_phone',
            value: data.lawyer_phone
        },
        {
            id: 33, 
            key: 'Litigation Date', 
            name: 'litigation_date',         
            value: data.litigation_date
        },
        {
            id: 34,
            key: 'Date Served',
            name: 'date_served',
            value: data.date_served
        },
        {
            id: 35, 
            key: 'Suit Status',
            name: 'suit_status',          
            value: data.suit_status
        },
        {
            id: 36,  
            key: 'Image Date (Proof of funding)',
            name: 'image_date',  
            value: data.image_date
        },
        {
            id: 37, 
            key: 'RTR', 
            name: 'balance',
            value: data.balance
        },
        {
            id: 38, 
            key: 'RTR Payback Amount', 
            name: 'balancePayback',
            value: computedData.balancePayback
        },
        {
            id: 39, 
            key: 'RTR + Legal',
            name: 'rtr_legal', 
            value: data.rtr_legal
        },
        {
            id: 40, 
            key: 'RTR + Legal Payback Amount', 
            name: 'rtrLegalPayback',
            value: computedData.rtrLegalPayback
        },
        {
            id: 41, 
            key: 'Full', 
            name: 'total',
            value: data.total
        },
        {
            id: 42, 
            key: 'Full Payback Amount',
            name: 'totalPayback',
            value: computedData.totalPayback
        },

        {
            id: 43, 
            key: 'Contract Payoff Date',
            name: 'contractPayDate', 
            value: computedData.contractPayDate 
        },
        {
            id: 44,
            key: 'Remittance',
            name: 'remittance',
            value: data.remittance
        },
        {
            id: 45, 
            key: 'Service', 
            name: 'service',
            value: data.service
        },
        {
            id: 46, 
            key: 'Affidavit Of Service', 
            name: 'aos',
            value: data.aos
        },
        {
            id: 47, 
            key: 'UCC', 
            name: 'ucc_status',
            value: data.ucc_status
        },
        {
            id: 48,
            key: 'Damages',
            name: 'damages',
            value: data.damages
        },
        {
            id: 49,
            key: 'Legal',
            name: 'legal',
            value: data.legal
        },
        {
            id: 50,
            key: 'Default Date',
            name: 'default_date',
            value: data.default_date
        },
        {
            id: 51,
            key: 'Default Judgment',
            name: 'defJudgment',
            value: computedData.defJudgment
        },
        {
            id: 52, 
            key: 'Response Date', 
            name: 'response_date',           
            value: data.response_date
        },
        {
            id: 53, 
            key: 'Six-Month Payoff Date',
            name: 'six_month_payoff_date',
            value: data.six_month_payoff_date
        },
        {
            id: 54,
            key: 'Notes',
            name: 'notes',
            value: data.notes
        }
    ]
    
    // Array Map...
    const gridItems = gridArray.map(row => (
        <MerchantDataField
            key={row.id} 
            row={row} 
            handleChange={handleChange} 
            handleComputedChange={handleComputedChange}
            handleBlur={handleBlur}  
        />
    ))
    
    return (

        <Container maxWidth={false} sx={styles.dataContainer}>
            <Box sx={styles.dataBox}>
                <Typography sx={styles.dataTitle}>Merchant Data Summary</Typography>
                <ArrowForwardIcon fontSize="large" sx={styles.dataArrow} onClick={() => setDataPageFlag(false)} />
            </Box>

            <Grid container spacing={2}>{gridItems}</Grid>
        </Container>
    )
}
export default MerchantData