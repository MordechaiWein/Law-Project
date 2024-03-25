import React from "react";
import styles from "../styles/OperationLoadingStyles";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';

function OperationLoading({ open }) {

    const isMobile = useMediaQuery('(max-width: 700px)');

    return (

        <Dialog open={open} PaperProps={{sx: isMobile ? styles.dlgSm : styles.dlgLg}}>

            <CircularProgress sx={styles.spinner} />
            <Typography sx={styles.dlgHeader}>Please wait, operation is underway...</Typography>
            
            <Box sx={styles.box}>
                <Typography sx={styles.loadingText}>Retrieving relevant data...</Typography>
                <Typography sx={styles.loadingText}>Saving merchant information...</Typography>
                <Typography sx={styles.loadingText} >Saving documents...</Typography>
                <Typography sx={styles.loadingText}>Redacting sensitive information...</Typography>
            </Box>

        </Dialog>
    )
}
export default OperationLoading;