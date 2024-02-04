const styles = {
    
    dlgSm: {
        borderRadius: '10px', 
        padding: '30px'
    },

    dlgLg: {
        borderRadius: '10px', 
        padding: '100px',
    },

    title: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold', 
        fontSize: '2rem', 
        lineHeight: 1.2 ,
        marginBottom: '1rem'    
    },

    description: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '0.9rem',
        lineHeight: 1.2 , 
        color: '#333333',  
        marginBottom: '2rem'
    },

    label: {
        fontFamily: 'AmazonEmberRegular', 
        fontWeight: 'bold', 
        fontSize: '1.1rem',
        marginBottom: '0.3rem' 
    },

    textField: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '0.85rem',
        height: '38px', 
    },

    errors: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '0.85rem',
        color: '#c62828',
        marginBottom: '2rem',
        marginTop: '0.1rem'
    },

    button: {
        fontFamily: 'AmazonEmberRegular', 
        textTransform: 'none', 
        boxShadow: 'none',  
        fontSize: '1.1rem', 
        fontWeight: 'bold', 
        borderRadius: '0px',
        marginBottom: '2rem',
        backgroundColor: 'black',
        '&:hover': { backgroundColor: 'black'}
    },

    emailSuccess: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '1.4rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    
    errorIcon: {
        color: 'red',
        mr: 0.5
    },
    
    emailError: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: '1.1rem',
        color: 'red'
    }
    
}
export default styles