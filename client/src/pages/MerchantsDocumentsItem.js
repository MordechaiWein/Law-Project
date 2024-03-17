import React from "react"
import styles from "../styles/MerchantDocumentStyles"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DownloadIcon from '@mui/icons-material/Download'
import { saveAs } from 'file-saver'

function MerchantsDocumentsItem({ docObj }) {

    const filenameArray = docObj.filename.split(/[.-]+/)
    const subFilenameArray = filenameArray[1].split(" ")
    const redacted = subFilenameArray.find(word => word === "(redacted)")

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
            <Box sx={styles.innerBox}>
                <Typography sx={styles.fileName}>{filenameArray[0]}</Typography>
                &nbsp;
                <Typography sx={styles.redacted}>{redacted}</Typography>
            </Box>
            <DownloadIcon sx={styles.fileIcon} onClick={handleDownloadClick}/>
        </Box>
    )
}
export default MerchantsDocumentsItem