import React from "react"
import styles from "../styles/MerchantDocumentStyles"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DownloadIcon from '@mui/icons-material/Download'
import { saveAs } from 'file-saver'

function MerchantsDocumentsItem({ docObj }) {


    function handleDownloadClick() {
        fetch('/download-merchant-document', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ url: docObj.url })
        })
        .then(response => response.blob())
        .then(blob => saveAs(blob, docObj.filename))
    }
    
    return (

        <Box sx={styles.box}>
            <Typography sx={styles.fileName}>{docObj.filename.split(".")[0]}</Typography>
            <DownloadIcon sx={styles.fileIcon} onClick={handleDownloadClick}/>
        </Box>
    )
}
export default MerchantsDocumentsItem