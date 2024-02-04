import React, { useMemo } from 'react'
import Container from '@mui/material/Container'
import { useHistory } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

function DealList() {

    const history = useHistory()
    const rowStyle = {fontFamily: 'AmazonEmberRegular'}

    const rowData = [ {id: 1,name: 'Melinda Marie Brands', funder: 'Velocity Capital Group LLC',balance: '$1,000,000',defaultfee: '$1,000,000',NSFfee: '$40,000',uccfee: '$50,000',total: '$45,000',legal: 'Nathen Wein Law',subtotal: '$30,000',phone: '1-917-745-6409',phone2: '1-516-526-2096',email: 'mordwein77@gmail.com'}]

    const columnDefs = [
        { headerName: 'Name', field: 'name', editable: false, cellClass: 'name-column'},
        { headerName: 'Funder', field: 'funder'},
        { headerName: 'Balance', field: 'balance'},
        { headerName: 'Default Fee', field: 'defaultfee'},
        { headerName: 'NSF Fee', field: 'NSFfee'},
        { headerName: 'UCC Fee', field: 'uccfee'},
        { headerName: 'Total', field: 'total'},
        { headerName: 'Legal', field: 'legal'},
        { headerName: 'Subtotal', field: 'subtotal'},
        { headerName: 'Phone', field: 'phone'},
        { headerName: 'Phone 2', field: 'phone2'},
        { headerName: 'Email', field: 'email'}
    ]

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
        width: 290,
        headerClass: 'header-style'
    }), [])

    function cellClickedListener(event) {
        if (event.colDef.field === 'name') { 
            const modifiedName = event.data.name.replace(/ /g, '-')
            history.push(`deal-list/${modifiedName}`)
        }
    }

    return (

        <Container disableGutters maxWidth={false} className='ag-theme-quartz' style={{width: '100%', height: '100vh'}}>
            <AgGridReact 
                onCellClicked={cellClickedListener}
                rowData={rowData} 
                columnDefs={columnDefs} 
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
                rowHeight={32}
                rowStyle={rowStyle}
                suppressRowHoverHighlight={true}
            />
        </Container>
    )
}
export default DealList