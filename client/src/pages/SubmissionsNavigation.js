import React, { useContext } from 'react'
import { AppContext } from "../components/AppContext"
import { useHistory } from "react-router-dom"
import styles from '../styles/SubmissionsStyles'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

function SubmissionsNavigation({ isMobile }) {
    
    const {setUser, user, setSignUpFormVisible} = useContext(AppContext)
    
    const history = useHistory()
  
    function handleClick() {
        fetch('/logout', { method: 'DELETE' } )
        .then(() => { setUser(null); history.push('/') })
    }
    
    return (
    
        <>
            {isMobile ? (
                null
                ):(
                <Box sx={styles.navBox}>
                    <Box sx={styles.boxMargin}>
                        <ListItem>
                            <FormatListBulletedOutlinedIcon/>
                            <Link to="/deal-list" style={styles.link}>Deal list</Link>
                        </ListItem>
    
                        {user.boss && user.name === "Martin Wein" ? 
                            <ListItem sx={styles.linkMgBm}>
                                <EmailOutlinedIcon />
                                <Link onClick={() => setSignUpFormVisible(true)} to="/" style={styles.link}>Send sign up link</Link>
                            </ListItem>
                            :
                            null
                        }

                        <Divider/>
                    </Box>
    
                    <Box sx={styles.boxMargin}>
                        <Box sx={styles.userBox}>
                            <AccountCircleIcon  sx={styles.userIcon}/>
                            <Typography sx={styles.userName}>{user.name.length > 21 ? `${user.name.slice(0,21)}...` : user.name }</Typography>
                        </Box>
    
                        <Typography onClick={handleClick} sx={styles.logout}>Log out</Typography>
                    </Box>
                </Box> 
            )}
        </>
    )
}
export default SubmissionsNavigation