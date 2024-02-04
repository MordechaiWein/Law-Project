import React, { useState } from 'react'
import styles from '../styles/DropZonesStyles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useMediaQuery } from '@mui/material'

function DropZoneCard({ dropZone, handleDrop, files, fileErrors }) {

    const isMobile = useMediaQuery('(max-width: 1350px)')
    const [hoveredId, setHoveredId] = useState(null)

    // const [fileErrors, setFileErrors] = useState({ 
    //     contract: false, 
    //     paymentHistory: false, 
    //     fundingConfirmation: false 
    // }) 

    // const [files, setFiles] = useState({ 
    //     contract: "", 
    //     paymentHistory: "", 
    //     fundingConfirmation: ""
    // })

    // function handleDrop (event, keyName) { 
    //     event.preventDefault()

    //     setHoveredId(null)
    //     const name = event.dataTransfer.files[0].name

    //     if (name.includes("Resume") || name.includes("Payment") ||  name.includes("Funding")) {

    //         setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
    //         setFileErrors({ ...fileErrors, [keyName]: false })
    //     } else {

    //         setFiles({...files, [keyName] : event.dataTransfer.files[0].name})
    //         setFileErrors({ ...fileErrors, [keyName]: true })
    //     }
    // }

    return (

        <Grid 
            item 
            xs={12} sm={6} md={4} 
            onDragOver={(e) => { e.preventDefault(); setHoveredId(dropZone.id); }} 
            onDragLeave={() => setHoveredId(null)} 
            onDrop={(event) => handleDrop(event, dropZone.keyName)}
        >        
            <Box sx={hoveredId === dropZone.id ? styles.gridBoxAct : styles.gridBoxInact}>
                <Box>
                    <FileDownloadOutlinedIcon sx={styles.downloadIcon}/>
                    <Typography sx={styles.dzName}>{dropZone.name}</Typography>
                    <Typography sx={styles.dzType}>Allowed file types {dropZone.type}</Typography>
                </Box>

                { files[dropZone.keyName] ?  
                    <>
                        { isMobile ?
                            <>
                                { fileErrors[dropZone.keyName]  ?
                                    <ErrorOutlineIcon sx={styles.errorIcn}/>         
                                :
                                    <CheckCircleIcon  sx={styles.checkIcn}/>
                                }
                            </>
                        :
                            <>
                                { fileErrors[dropZone.keyName]  ?
                                    <Typography sx={styles.error}>That file format is not supported.</Typography>
                                :
                                    <ListItem sx={styles.upload}>
                                        <Typography sx={styles.fileNm}>{`${files[dropZone.keyName].slice(0, 32)}`}</Typography>
                                        <CloseIcon fontSize='small' />  
                                    </ListItem>
                                }
                            </>
                        }
                    </>
                    : 
                    null
                }
            </Box>
        </Grid>
    )
}
export default DropZoneCard