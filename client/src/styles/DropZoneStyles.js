const styles = {

    // ============= DropZoneCard.js ============= //
                
    gridBoxInact: {
        height: {xs: '200px', sm: '200px', lg: '250px'},
        display: 'flex', 
        flexDirection: 'column', 
        border: 'dashed 2.5px #ccc', 
        textAlign: 'center', 
        flexGrow: 1, 
        alignItems: 'center', 
        color: "grey", 
        justifyContent: 'space-evenly',
        padding: '0 30px 0 30px'
    },

    gridBoxAct: {
        height: {xs: '200px', sm: '200px', lg: '250px'},
        display: 'flex', 
        flexDirection: 'column', 
        border: 'dashed 2.5px #0099cc', 
        textAlign: 'center', 
        flexGrow: 1, 
        alignItems: 'center', 
        color: "grey", 
        justifyContent: 'space-evenly',
        padding: '0 30px 0 30px'
    },

    downloadIcon: {
        fontSize: 45
    },

    dzName: {
        fontSize: '1.4rem', 
        fontWeight: 'bold',
        fontFamily: "AmazonEmberRegular"
    },

    dzType: {
        fontSize: '0.9rem', 
        fontFamily: "AmazonEmberRegular" 
    },

    checkIcn: {
        color: '#2e7d32', 
        fontSize: '2.3rem'
    },

    errorIcn: {
        color: '#c62828', 
        fontSize: '2.3rem'
    },

    upload: {
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5', 
        padding: '6px',
        paddingLeft: '10px'
    },

    fileNm: {
        fontSize: '0.9rem',
        fontFamily: "AmazonEmberRegular",
        fontWeight: 'bold'
    },

    error: {
        fontSize: '0.9rem',
        fontFamily: "AmazonEmberRegular",
        color: '#c62828',
        padding: '5px'
    },

    // ============= DropZoneContainer.js ============= //

    submitError: {
        fontFamily: "AmazonEmberRegular",
        color: '#c62828',
        marginTop: '1rem'
    },

    resMessage: {
        fontFamily: "AmazonEmberRegular",
        fontWeight: 'bold',
        marginTop: '2rem'
    },

    button: {
        marginTop: '2rem',
        width: {xs: '12rem', sm: '12rem', lg: '30rem'},
        height: '3rem',
        fontFamily: "AmazonEmberRegular",
        fontSize: '1.3rem',
        fontWeight: 'bold', 
        textTransform: 'none', 
        borderRadius: '25px',
        boxShadow: 'none',
        backgroundColor: 'black',
        '&:hover': { backgroundColor: 'black'}
    }

}
export default styles