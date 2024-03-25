import React, { useState, useContext } from 'react'
import DropZoneCard from '../pages/DropZoneCard'
import OperationLoading from './OperationLoading'
import styles from '../styles/DropZoneStyles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { AppContext } from "./AppContext"

function DropZoneContainer() {

    const {merchants, setMerchants} = useContext(AppContext)

    // Component States...
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {setOpen(false)};

    const [hoveredId, setHoveredId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [resSuccess, setResSuccess] = useState('')
    const [resError, setResError] = useState('')
    const [files, setFiles] = useState({ 
        contract: '', 
        paymentHistory: '', 
        fundingConfirmation: '' 
    })

    const removeFileClick = (dropZone) => { setFiles( {...files, [dropZone.key]: ''} ); }

    // Drop function...
    function handleDrop (event, dropZone) {
        event.preventDefault() // Prevent default behavior and allow file drop...

        setHoveredId(null) // Remove the hover border.

        const droppedFile = event.dataTransfer.files[0] // The file that was dropped in...
        
        setFiles({...files, [dropZone.key]: droppedFile }) 
    }

    // Submit function...
    function handleSubmit(e) {
        e.preventDefault()
        
        if(files.contract && files.paymentHistory && files.fundingConfirmation) {
            
            setSubmitError('')
            
            const formData = new FormData() // Send the documents down as form data.
            formData.append('contract', files.contract)
            formData.append('payment_history', files.paymentHistory)
            formData.append('funding_confirmation', files.fundingConfirmation)
            
            setIsLoading(true)
            fetch('/merchants', {
                method: 'POST',
                body: formData
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => {
                        setResSuccess(data.message)
                        setIsLoading(false)
                        handleClose()
                        setMerchants([...merchants, data.merchant])
                    })
                } else { 
                    response.json().then(data => {
                        setResError(data.error)
                        setIsLoading(false)
                        handleClose()
                    })
                }
            })
            .catch(() => {
                setResError("Submission failed. Please try again. Avoid renaming and re-dropping files into different zones.")
                setIsLoading(false)
            })

            setFiles({contract: '', paymentHistory: '', fundingConfirmation: ''})

        } else {

            setSubmitError('Please ensure all documents have been placed in their respective drop zones before submitting.')
        }
    }

    const dropZones = [
        {id: 1,  key: 'contract',            name: 'Contract',             type: '.pdf'},
        {id: 2,  key: 'paymentHistory',      name: 'Payment History',      type: '.pdf'},
        {id: 3,  key: 'fundingConfirmation', name: 'Funding Confirmation', type: '.png'},
        {id: 4,  key: 'null1',               name: 'Unavailable',          type:  'N/A'},
        {id: 5,  key: 'null2',               name: 'Unavailable',          type:  'N/A'},
        {id: 6,  key: 'null3',               name: 'Unavailable',          type:  'N/A'}
    ]

    const gridItems = dropZones.map(dropZone => (
        <DropZoneCard 
            key={dropZone.id} 
            dropZone={dropZone} 
            handleDrop={handleDrop}
            files={files}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            removeFileClick={removeFileClick}
        />
    ))

    return (
        
        <Box component="form" onSubmit={handleSubmit}>

            {isLoading ? <OperationLoading open={open}/> : null }
            
            <Grid container spacing={4}>{gridItems}</Grid>
        
            {resSuccess ? 
                <Alert severity="success" variant='filled' sx={styles.resMessage} onClose={() => setResSuccess("")}>{resSuccess}</Alert> : null 
            }

            {resError ? 
                <Alert severity="error" variant='filled' sx={styles.resMessage} onClose={() => setResError("")}>{resError}</Alert> : null
            }

            {submitError ? <Alert severity="error" sx={styles.submitError} onClose={() => setSubmitError("")}>{submitError}</Alert> : null}
            
            <Button type='submit' variant="contained" disableRipple sx={styles.button}>Submit</Button>

        </Box>
    )
}
export default DropZoneContainer