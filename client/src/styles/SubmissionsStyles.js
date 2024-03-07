const styles = {

    // ============ SubmissionsContainer.js ============ //

    contSm: {
        minHeight: '100vh', 
        display: 'flex'
    },

    contLg: {
        minHeight: '100vh', 
        display: 'flex',
        boxShadow: '0 10px 15px rgba(0, 23, 81, 0.2)'
    },

    // ============ SubmissionsNavigation.js ============ //

    navBox: {
        borderRight: 'solid 1px #ccc', 
        width: '17rem', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    boxMargin: {
        margin: 2
    },

    link: {
        textDecoration: 'none', 
        color: '#000000', 
        fontFamily: "AmazonEmberRegular",
        marginLeft: '0.5rem'
    },

    linkMgBm: {
        marginBottom: '1.5rem'
    },

    userBox: {
        display: 'flex', 
        alignItems: 'center', 
        border: 'solid 1px #DDDDDD', 
        padding: '7px 0 7px 5px',
        borderRadius: '7px', 
        marginBottom: '0.5rem'
    },

    userIcon: {
        fontSize: '1.5rem', 
        color: 'gray'
    },

    userName: {
        marginLeft: '0.2rem', 
        marginTop: '0.1rem',  
        fontFamily: "AmazonEmberRegular"
    },

    logout: {
        border: 'solid 1px #DDDDDD', 
        padding: '7px 0 7px 10px',
        borderRadius: '7px', 
        fontFamily: "AmazonEmberRegular",
        cursor: 'pointer' 
    },

    // ============ SubmissionsPage.js ============ //

    secondBox: {
        width: '85%',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '0 0 2rem 0'
    },

    secondBoxLg: {
        width: '100%',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '0 0 2rem 0'
    },

    menuIcon: {
        cursor: 'pointer'
    },

    coName: {
        fontSize: {xs: '3rem', sm: '3rem', md: '3rem', lg: '4rem'},
        fontWeight: 'bold',
        fontFamily: "AmazonEmberRegular",
        marginBottom: '1rem'   
    },

    cCoName: {
        fontSize: {xs: '1.5rem', sm: '1.5rem', md: '2rem', lg: '2.5rem'},
        fontWeight: 'bold',
        fontFamily: "AmazonEmberRegular",
        marginBottom: '5rem'
    },

    instructions: {
        fontSize: {xs: '2rem', sm: '2rem', md: '2rem', lg: '3rem'},
        fontWeight: 'bold',
        fontFamily: "AmazonEmberRegular",
        marginBottom: '2rem'
    },
    
    userBoxSm: {
        display: 'flex', 
        alignItems: 'center', 
        border: 'solid 1px #DDDDDD', 
        padding: '7px 0 7px 5px',
        borderRadius: '7px', 
        marginBottom: '0.5rem',
        justifyContent: 'center',
        mt: 3
    }  
    
}
export default styles