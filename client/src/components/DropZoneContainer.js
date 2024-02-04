import React, { useState } from 'react'
import DropZoneCard from '../pages/DropZoneCard'
import styles from '../styles/DropZonesStyles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function DropZoneContainer() {


    let paymentPdf
    let resumeFile
    let imageFile

    function handleDrop (event) { 
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]

        if (droppedFile.name.includes("Payment")) {
            paymentPdf = droppedFile
        } else if (droppedFile.name.includes("Funding")) {
            imageFile = droppedFile
        } else {
            resumeFile = droppedFile
        }

        if (paymentPdf && resumeFile && imageFile) {
            console.log(paymentPdf.name)
            console.log(imageFile.name)
            console.log(resumeFile.name)
        }
    }

    const [fileErrors, setFileErrors] = useState({ 
        contract: false, 
        paymentHistory: false, 
        fundingConfirmation: false 
    }) 

    const [files, setFiles] = useState({ 
        contract: "", 
        paymentHistory: "", 
        fundingConfirmation: ""
    })

    function handleDrop (event, keyName) { 
        event.preventDefault()
        // const name = event.dataTransfer.files[0].name
        const droppedFile = event.dataTransfer.files[0]

        if (droppedFile.name.includes("Payment")) {
            paymentPdf = droppedFile

            setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
            setFileErrors({ ...fileErrors, [keyName]: false })

        } else if (droppedFile.name.includes("Funding")) {
            imageFile = droppedFile

            setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
            setFileErrors({ ...fileErrors, [keyName]: false })
            
        } else if (droppedFile.name.includes("Resume")) {
            resumeFile = droppedFile

            setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
            setFileErrors({ ...fileErrors, [keyName]: false })
            
        } else {

            setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
            setFileErrors({ ...fileErrors, [keyName]: true })
        }

    }

    const dropZones = [

        {id: 1, keyName: 'contract', name: 'Contract', type: '.pdf'},
        {id: 2, keyName: 'paymentHistory', name: 'Payment History', type: '.pdf'},
        {id: 3, keyName: 'fundingConfirmation', name: 'Funding Confirmation', type: '.png'},
        {id: 4, keyName: 'null', name: 'Unavailable', type: 'N/A'},
        {id: 5, keyName: 'null', name: 'Unavailable', type: 'N/A'},
        {id: 6, keyName: 'null', name: 'Unavailable', type: 'N/A'}
    ]

    const gridItems = dropZones.map(dropZone => <DropZoneCard key={dropZone.id} dropZone={dropZone} handleDrop={handleDrop} files={files} fileErrors={fileErrors}/>)

    return (

        <Box>
            <Grid container spacing={4}>{gridItems}</Grid>
            <Button variant="contained" disableRipple sx={styles.button}>Submit</Button> 
        </Box>
    )
}
export default DropZoneContainer