const styles = {

    parentContainer: {
        height: '100vh', 
        backgroundColor: '#F8F8F8'
    },

    container: {
        height: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column'
    },

    logo: {
        marginBottom: '2rem',
        fontWeight: 'bold'
    },

    box: {
        backgroundColor: 'white', 
        border: 'solid 1px #ccc', 
        padding: '25px', 
        width: '300px', 
        borderRadius: '8px'
    },

    signIn: {
        fontFamily: "AmazonEmberRegular",
        marginBottom: "20px"
    },

    name: {
        fontFamily: "AmazonEmberRegular", 
        fontWeight: 'bold', 
        fontSize: '',
        marginLeft: '0.1rem'
    },
    
    textField: {
        fontSize: '0.85rem',
        fontFamily: "AmazonEmberRegular"
    },
    
    error: {
        fontSize: '0.95rem',
        marginLeft: '0.1rem',
        color: '#c62828',
        paddingTop: '0.7rem',
        fontFamily: "AmazonEmberRegular" 
    },

    password: {
        fontFamily: "AmazonEmberRegular", 
        marginTop: '20px', 
        fontWeight: 'bold', 
        fontSize: '',
        marginLeft: '0.1rem'
    },

    button: {
        fontFamily: "AmazonEmberRegular",
        mt: 2, 
        mb: 1, 
        boxShadow: 'none', 
        color: 'black', 
        borderRadius: '8px',
        textTransform: 'none'
    },

    rules: {
        fontFamily: "AmazonEmberRegular",
        fontSize: '0.8rem', 
        marginTop: '20px'
    },

    administrator: {
        textDecoration: 'none',
        color: '#00559A',
        '&:hover': { color: '#e06d33', textDecoration: 'underline' }
    }
    
}
export default styles