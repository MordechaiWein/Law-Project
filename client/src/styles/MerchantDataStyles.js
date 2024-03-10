const styles = {
    
    // ================= MerchantData.js ================ //
    
    dataContainer: {
        pb: 10
    },

    dataBox: {
        display: 'flex', 
        alignItems: 'baseline', 
        justifyContent: 'space-between' 
    },

    dataTitle: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginLeft: 'auto',
        marginRight: 'auto',
        pt: 2, 
        pb: 5     
    },

    dataArrow: {
        color: 'black',
        cursor: 'pointer',
        '&:hover': { color: '#FFA500'}
    },

    // =============== MerchantDataField.js ============ //

    datakey: {
        fontFamily: 'AmazonEmberRegular'
    },

    dataValue: {
        fontSize: '0.8rem'
    }

} 
export default styles