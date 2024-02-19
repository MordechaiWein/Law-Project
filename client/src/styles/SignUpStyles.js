const styles = {

    // =============== SignUp.js =============== //

    parentContainer: {
        height: '100vh', 
        backgroundColor: '#F8F8F8'
    },

    container: {
        height: '80vh', 
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
        width: '360px', 
        borderRadius: '8px'
    },

    signUp: {
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

    errors: {
        fontSize: '0.85rem',
        marginLeft: '0.1rem',
        color: '#c62828',
        paddingTop: '0.3rem',
        fontFamily: "AmazonEmberRegular",
        marginBottom: '-5px'
    },

    label: {
        fontFamily: "AmazonEmberRegular", 
        marginTop: '15px', 
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

    // =============== InvalidToken.js =============== //

    invalidContainer: {
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    fourOFour: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '6rem', 
        fontWeight: 'bold'
    },

    message: {
        fontFamily: 'AmazonEmberRegular', 
        fontSize: '2rem', 
        textAlign: 'center'
    }
     
}
export default styles