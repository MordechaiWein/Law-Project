import React, { useMemo, useContext } from 'react'
import { AppContext } from "./AppContext"
import Big from 'big.js'
import Container from '@mui/material/Container'
import { useHistory } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

function DealList() {

    const history = useHistory()
    const {merchants, editMerchant} = useContext(AppContext)

    const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/

    function cellClickedListener(event) {
        if (event.colDef.field === 'merchants_legal_name_title_case') { 
            const modifiedName = event.data.merchants_legal_name_title_case.replace(/ /g, '-')
            history.push(`deal-list/${modifiedName}`)
        } 
    }

    function agGridCellSubmit(editData) {
        fetch(`/merchants/${editData.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editData)
        })
        .then(response => response.json())
        .then(data => editMerchant(data))
    }

    function paybackAmounts(event, newValue) {
        const divisor = new Big('26')
        let paybackAmount = ''
        if (event.colDef.field === "balance") {
            paybackAmount = event.data.balance_pb_amount
        } else if (event.colDef.field === "rtr_legal") {
            paybackAmount = event.data.rtr_legal_pb_amount
        } else {
            paybackAmount = event.data.total_pb_amount
        }
        if (newValue != null) {
            const cleanedNewValue = newValue.replace(/[^\d.-]/g, '')
            const cleanedNewValueToInt = parseInt(cleanedNewValue)
            if (!isNaN(cleanedNewValueToInt)) {
                const dividend = new Big(cleanedNewValue)
                const result = dividend.div(divisor)
                const number = result.toNumber()  
                const format = number.toLocaleString('en-US', { maximumFractionDigits: 3 })
                paybackAmount = "$" + format
                return paybackAmount
            }
        }
        return paybackAmount
    }

    function CellValueChanged(event) {
        if (event.colDef.field === "date_served") {
            if (event.data.date_served && event.data.date_served.match(dateRegex)) {
                const servedDate = new Date(event.data.date_served)
                servedDate.setDate(servedDate.getDate() + 35)
                const defaultJudgmentDate = servedDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'})
                const editData = {id: event.data.id, date_served: event.data.date_served, default_judgment: defaultJudgmentDate}
                agGridCellSubmit(editData)
            } else {
                const editData = {id: event.data.id, [event.colDef.field]: event.newValue}
                agGridCellSubmit(editData)
            }
        }
        else if (event.colDef.field === "balance") {
            const balancePbAmount = paybackAmounts(event, event.newValue)
            const editData = {id: event.data.id, [event.colDef.field]: event.newValue, balance_pb_amount: balancePbAmount}
            agGridCellSubmit(editData)
        }
        else if (event.colDef.field === "rtr_legal") {
            const rtrLegalPbAmount = paybackAmounts(event, event.newValue)
            const editData = {id: event.data.id, [event.colDef.field]: event.newValue, rtr_legal_pb_amount: rtrLegalPbAmount}
            agGridCellSubmit(editData)
        }
        else if (event.colDef.field === "total") {
            const totalPbAmount = paybackAmounts(event, event.newValue)
            const editData = {id: event.data.id, [event.colDef.field]: event.newValue, total_pb_amount: totalPbAmount}
            agGridCellSubmit(editData)
        }
        else {
            const editData = {id: event.data.id, [event.colDef.field]: event.newValue}
            agGridCellSubmit(editData)
        }
    }

    function isPastDefaultJudgment(defaultJudgmentDate) {
        const today = new Date()
        const judgmentDate = new Date(defaultJudgmentDate)
        return today >= judgmentDate
    }
 
    const columnDefs = [   
        { headerName: 'Name', field: 'merchants_legal_name_title_case', editable: false, cellClass: 'name-column'},
        { headerName: 'Date Submitted', field: 'created' },
        { headerName: 'RTR', field: 'balance'},
        { headerName: 'RTR + LEGAL', field: 'rtr_legal'}, 
        { headerName: 'FULL', field: 'total'},
        { 
            headerName: 'Suit Status', 
            field: 'suit_status',
            cellClassRules: {
                'red-cell': (params) => params.value === 'Not yet filed',
                'green-cell': (params) => params.value === 'Filled'
            }
        },
        { 
            headerName: 'AOS', 
            field: 'aos',
            cellClassRules: {
                'red-cell': (params) => params.value === 'Not yet filed',
                'green-cell': (params) => params.value === 'Filled'
            }
            
        },
        { 
            headerName: 'Date Served', 
            field: 'date_served',
            cellClassRules: {
                'red-cell': (params) => params.value === 'Not yet served',
                'green-cell': (params) => params.value && params.value.match(dateRegex)
            }
        },
        { 
            headerName: 'Default Judgment', 
            field: 'default_judgment',
            editable: false,
            cellClassRules: {
                'green-cell': (params) => isPastDefaultJudgment(params.value)
            }
        },
        { 
            headerName: 'UCC Satuts', 
            field: 'ucc_status',
            cellClassRules: {
                'red-cell': (params) => params.value === 'Not yet started',
                'green-cell': (params) => params.value === 'Complete',
                'blue-cell': (params) => params.value === 'In process',
            }
        },   
        { headerName: 'Law Firm', field: 'law_firm'},
        { headerName: 'Notes', field: 'notes'} 
    ]
    
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
        width: 286.5,
        cellClass: 'columns',
        headerClass: 'header-style'
    }), [])

    return (

        <Container disableGutters maxWidth={false} className='ag-theme-quartz' style={{width: '100%', height: '100vh'}}>
            <AgGridReact 
                onCellClicked={cellClickedListener}
                onCellValueChanged={CellValueChanged}
                rowData={merchants} 
                columnDefs={columnDefs} 
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
                rowHeight={32}
                suppressRowHoverHighlight={true}
            />
        </Container>
    )
}
export default DealList