const styles = {

    // ============= MerchantDocumentsList.js ============ //

    contLg: {
        height: '100vh',
        py: 8,
        boxShadow: '0 10px 15px rgba(0, 23, 81, 0.2)'
    },

    contSm: {
        height: '100vh',
        py: 8
    },

    titleBox: {
        display: 'flex',
        border: 'solid 1px #ccc',
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 3
    },

    title: {
        fontFamily: 'AmazonEmberRegular',
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    arrowIcon: {
        color: 'black',
        cursor: 'pointer',
        '&:hover': { color: '#FFA500'}
    },

    // ============= MerchantDocumentsItem.js ============ //

    box: {
        display: 'flex',
        justifyContent: 'space-between',
        borderLeft: 'solid 1px',
        borderRight: 'solid 1px',
        borderBottom: 'solid 1px',
        borderColor: '#ccc',
        color: '#0073bb',
        px: 3,
        py: 1
    },

    fileName: {
        fontFamily: 'AmazonEmberRegular'
    },

    fileIcon: {
        fontSize: 30,
        '&:hover': { color: '#FFA500', cursor: 'pointer'}
    }
}
export default styles