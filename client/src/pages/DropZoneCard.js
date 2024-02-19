import React from 'react'
import styles from '../styles/DropZoneStyles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useMediaQuery } from '@mui/material'

function DropZoneCard({ dropZone, files, fileErrors, hoveredId, setHoveredId, handleDrop, removeFileClick }) {
    
    const isMobile = useMediaQuery('(max-width: 1350px)')
    
    return (

        <Grid 
            item 
            xs={12} sm={6} md={4} 
            onDragOver={(e) => { e.preventDefault(); setHoveredId(dropZone.id); }} 
            onDragLeave={() => setHoveredId(null)} 
            onDrop={(event) => handleDrop(event, dropZone)}
        >        
            <Box sx={hoveredId === dropZone.id ? styles.gridBoxAct : styles.gridBoxInact}>
                <Box>
                    <FileDownloadOutlinedIcon sx={styles.downloadIcon}/>
                    <Typography sx={styles.dzName}>{dropZone.name}</Typography>
                    <Typography sx={styles.dzType}>Allowed file types {dropZone.type}</Typography>
                </Box>

                {isMobile ?
                    <>
                        {fileErrors[dropZone.key]  ?

                            <ErrorOutlineIcon sx={styles.errorIcn}/>         
                        :
                            <>
                                { files[dropZone.key]  ?

                                    <CheckCircleIcon  sx={styles.checkIcn} onClick={() => removeFileClick(dropZone)}/>
                                :
                                    null
                                }
                            </>
                        }
                    </>
                :
                    <>
                        {fileErrors[dropZone.key]  ?
                        
                            <Typography sx={styles.error}>Ensure correct document type and zone for file.</Typography>
                        :
                            <>
                                {files[dropZone.key] ? 
                                
                                    <ListItem sx={styles.upload}>
                                        <Typography sx={styles.fileNm}>{`${files[dropZone.key].name}`.slice(0, 32)}</Typography>
                                        <CloseIcon fontSize='small' onClick={() => removeFileClick(dropZone)}/>
                                    </ListItem>
                                : 
                                    null 
                                }
                            </>
                        }
                    </>
                }

            </Box>
        </Grid>
    )
}
export default DropZoneCard