import React from "react"
import styles from '../styles/MerchantStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function MerchantOperations({ isSmScr }) {

    const props = { variant: 'contained', disableRipple: true }

    if (isSmScr) return <Typography sx={styles.smScr}>Please access a wider screen for operation buttons.</Typography>

    return (
    
        <Container disableGutters maxWidth={false} sx={styles.opContainer}>
            <Box sx={styles.boxOne}>

                <Typography sx={styles.title}>Lawsuit</Typography>

                <Box sx={styles.innerBoxOne}>
                    <Box sx={styles.innerBoxLt}>
                        <Button {...props} sx={styles.suitBtn}>Generate Settlement</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Lawsuit</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Affidavit of Service</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Default Judgment</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Motion for SJ</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Preliminary Injunction</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate SJ in lieu of Complaint</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Discontinuance</Button>
                        <Button {...props} sx={styles.suitBtn}>Generate Zero Balance Letter</Button>
                    </Box>

                    <Box sx={styles.innerBoxRt}>
                        <Button {...props} sx={styles.suitBtn}>Generate Payoff Letter</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                        <Button {...props} sx={styles.suitBtn}>Disabled</Button>
                    </Box>
                </Box>

            </Box>
            <Box sx={styles.boxTwo}>

                <Box sx={styles.lBoxTwo}>
                    <Typography sx={styles.title}>Communication</Typography>
                    <Button {...props} sx={styles.commsBtn}>Generate Initial Merchant Email</Button>
                    <Button {...props} sx={styles.commsBtn}>Generate Follow Up Merchant Email</Button>
                    <Button {...props} sx={styles.commsBtn}>Generate email to lawyer</Button>

                    <Typography sx={styles.repTitle}>Reporting</Typography>
                    <Button {...props} sx={styles.repBtn}>Manually Record Payment</Button>
                    <Button {...props} sx={styles.repBtn}>Generate Payrun</Button>
                    <Button {...props} sx={styles.repBtn}>Generate Remittance Report</Button>
                    <Button {...props} sx={styles.repBtn}>Document List</Button>
                    <Button {...props} sx={styles.repBtn}>Notes</Button>
                </Box>

                <Box  sx={styles.rBoxTwo}>
                    <Typography sx={styles.title}>UCC Lien Notices</Typography>
                    <Button {...props} sx={styles.uccBtn}>Generate UCC Notices</Button>
                    <Button {...props} sx={styles.uccBtn}>Email UCC Notices</Button>
                    <Button {...props} sx={styles.uccBtn}>Mail UCC Notices</Button>
                    <Button {...props} sx={styles.uccBtn}>Generate UCC Withdrawals</Button>
                    <Button {...props} sx={styles.uccBtn}>Email UCC Withdrawals</Button>
                    <Button {...props} sx={styles.uccBtn}>Mail UCC Withdrawals</Button>
                </Box> 
                   
            </Box>
        </Container>
    )
}
export default MerchantOperations