const styles = {

    // =============== MerchantsPage.js =============== //

    contLg: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        boxShadow: '0 10px 15px rgba(0, 23, 81, 0.2)'
    },

    contSm: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },

    pageName: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem', lg: '3rem'},
        fontWeight: 'bold', 
        textAlign: 'center',
        py: {xs: 4, sm: 0}
    },

    gridBox: {
        display: 'flex',   
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: 5
    },

    leftGrid: {
        width: '50%', 
        marginRight: '0.8rem'
    },

    rightGrid: {
        width: '50%', 
        marginLeft: '0.8rem'
    },

    // ============= MerchantInfoItem.js ============= //

    item: {
        height: { xs: '100px', sm: '75px', md: '75px', lg: '100px'},
    },

    key: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: { xs: '0.75rem', sm: '1rem', md: '1rem', lg: '1rem'},
        fontWeight: 'bold',
        backgroundColor: '#BCCFCF',
        border: 'solid 1px #bbb',
        pl: 1.5
    },

    value: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: '0.8rem',
        height: '40px', 
        borderRadius: 0   
    },

    // ============= MerchantOperations.js ============= //

    smScr: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: { xs: '1rem', sm: '1.5rem'},
        fontWeight: 'bold',
        textAlign: 'center',
        py: {xs: 6, sm: 0}
    },

    opContainer: {
        display: 'flex',
    },

    boxOne: {
        width: '50%', 
        marginRight: '1rem'
    },

    innerBoxOne: {
        display: 'flex'
    },

    innerBoxLt: {
        width: '50%',
        marginRight: '0.8rem' 
    },

    innerBoxRt: {
        width: '50%', 
        marginLeft: '0.8rem' 
    },

    boxTwo: {
        width: '50%', 
        marginLeft: '1rem',
        display: 'flex'
    },

    lBoxTwo: {
        width: '50%', 
        marginRight: '0.8rem'
    },

    rBoxTwo: {
        width: '50%',
        marginLeft: '0.8rem'
    },

    title: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold', 
        fontStyle: 'italic',
        textAlign: 'center', 
        p: 1
    },

    repTitle: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold', 
        fontStyle: 'italic',
        textAlign: 'center', 
        pt: 2.5
    },

    suitBtn: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold',
        textTransform: 'none', 
        width: '100%',
        borderRadius: '0px',
        color: 'black',
        mt: 1, 
        backgroundColor: '#5d9bd5', 
        '&:hover': { backgroundColor: '#4c88be'}
    },

    commsBtn: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold',
        textTransform: 'none', 
        width: '100%', 
        borderRadius: '0px',
        color: 'black',
        mt: 1, 
        backgroundColor: '#f29773',  
        '&:hover': { backgroundColor: '#d9845b'} 
    },

    repBtn: {
        fontFamily: 'AmazonEmberRegular',
        fontWeight: 'bold',
        textTransform: 'none', 
        width: '100%',
        borderRadius: '0px',
        color: 'black', 
        mt: 1, 
        backgroundColor: '#ffc14d',
        '&:hover': { backgroundColor: '#e0a83a'}
    },

    uccBtn: {
        fontFamily: 'AmazonEmberRegular',
        fontWeight: 'bold',
        textTransform: 'none', 
        width: '100%', 
        borderRadius: '0px',
        color: 'black',
        mt: 1, 
        backgroundColor: '#7cb464', 
        '&:hover': { backgroundColor: '#689d50'}
    }
    
}
export default styles