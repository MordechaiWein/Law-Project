const styles = {
    
    paperProps: {
        px: 7,
        pb: 5,
        pt: 5,
        height: '550px'
    },

    loadingBox: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center', 
        width: '994px', 
        height: '100%'
    },

    spinner: {
        p: 6
    },

    loadingText: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '1.5rem', 
        fontWeight: 'bold'
    },

    container: {
        height: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    
    title: {
        fontSize: '2.7rem', 
        fontWeight: 'bold', 
        fontFamily: 'AmazonEmberRegular', 
        textAlign: 'center',
        mb: 5
    },

    box: {
        display: 'flex', 
        alignItems: 'center'
    },

    boxTitle: {
        fontSize: '1.1rem', 
        fontWeight: 'bold', 
        fontFamily: 'AmazonEmberRegular', 
        color: 'black', 
        width: '300px'
    },

    select: {
        fontFamily: 'AmazonEmberRegular',
        width: '150px',
        height: '40px',
        textTransform: 'none',
        overflow: 'hidden',
        boxShadow: 'none',
        m: 1,
       '&:hover': { boxShadow: 'none' }
    },

    selected: {
        fontFamily: 'AmazonEmberRegular',
        width: '150px',
        height: '40px',
        textTransform: 'none',
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: '#FF9900',
        m: 1,
        '&:hover': { boxShadow: 'none', backgroundColor: '#FF9900' }
    },

    empty: {
        width: '150px',
        m: 1
    },
    
    textfield: {
        height: '40px',
        fontFamily: 'AmazonEmberRegular'
    },

    buttonBox: {
        display: 'flex', 
        justifyContent: 'center'
    },

    button: {
        fontSize: '1rem',
        fontWeight: 'bold',
        fontFamily: 'AmazonEmberRegular',
        textTransform: 'none', 
        borderRadius: '0px',
        width: '300px',
        p: 1,
        m: 1
    },

    error: {
        fontFamily: "AmazonEmberRegular",
        color: '#d32f2f',
        alignSelf: 'center',
        paddingTop: '0.7rem' 
    }
    
}
export default styles