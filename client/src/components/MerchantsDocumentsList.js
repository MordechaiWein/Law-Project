import React, { useMemo, useContext } from "react"
import styles from "../styles/MerchantDocumentStyles"
import MerchantsDocumentsItem from "../pages/MerchantsDocumentsItem"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AppContext } from "./AppContext"
import { useHistory } from 'react-router-dom'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'

function MerchantsDocumentsList() {
    
    const { merchants } = useContext(AppContext)
    const isLgScr = useMediaQuery('(min-width: 1850px)')

    const params = useParams()
    const history = useHistory()
    const modifiedName = params.name.replace(/-/g, ' ')

    const merchant = useMemo(
        () => merchants.find(merchant => merchant.merchants_legal_name_title_case === modifiedName) || {},
        [merchants, modifiedName]
    )

    const docList = merchant.document_info ? (
        merchant.document_info.map(docObj => <MerchantsDocumentsItem key={docObj.filename} docObj={docObj} />)
        ):(
        []
    )

    return (

        <Container style={{ maxWidth: isLgScr ? "2700px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>

            <Box sx={styles.titleBox}>
                <ArrowBackSharpIcon fontSize="large" sx={styles.arrowIcon} onClick={() => history.goBack()}/>
                <Typography sx={styles.title}>Documents</Typography>
            </Box>

            {docList}
            
        </Container>
    )
}
export default MerchantsDocumentsList