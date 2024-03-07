import React, { useMemo, useContext } from 'react'
import { AppContext } from "./AppContext"
import NameCellRenderer from './NameCellRenderer'
import Container from '@mui/material/Container'
import { useMediaQuery } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import Big from 'big.js'

function DealList() {

    const {merchants, editMerchant} = useContext(AppContext)

    // Variables.
    const history = useHistory()
    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/
    const autoSizeStrategy = { type: 'fitCellContents' }
    const gridStyle = { height: '100vh', boxShadow: isLgScr ? '0 10px 15px rgba(0, 23, 81, 0.2)': 'none', padding: isLgScr ?  3 : 0 }
    const wrap = { wrapHeaderText: true, autoHeaderHeight: true }

    // Functions.
    function cellClickedListener(event) {
        if (event.colDef.field === 'merchants_legal_name_title_case') { 
            const modifiedName = event.value.replace(/ /g, '-')
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
        
        const api = event.api
        const columns = api.getColumns()
        const columnIds = columns.map(column => column.colId)
        api.autoSizeColumns(columnIds)
    }

    function isPastDefaultJudgment(defaultJudgmentDate) {
        const today = new Date()
        const judgmentDate = new Date(defaultJudgmentDate)
        return today >= judgmentDate
    }

    // --------------------------- Cell Style Functions ------------------------- //
    function filedUnfiledstyle(params) {
        if (params.value && params.value.toLowerCase() === "not yet filed") {
            return {color: '#ef5350'}
        } 
        if (params.value && params.value.toLowerCase() === "filed") {
            return {color: '#4caf50'}
        }
    }

    function dateServedStyle(params) {
        if (params.value && params.value.toLowerCase() === "not yet served") {
            return {color: '#ef5350'}
        } 
        if (params.value && params.value.match(dateRegex)) {
            return {color: '#4caf50'}
        }
    }

    function defJudgment(params) {
        if(isPastDefaultJudgment(params.value)) {
            return {color: '#4caf50'}
        }
    }

    function uccStyle(params) {
        if (params.value && params.value.toLowerCase() === "not yet started") {
            return {color: '#ef5350'}
        }
        if (params.value && params.value.toLowerCase() === "complete") {
            return {color: '#4caf50'}
        }
        if (params.value && params.value.toLowerCase() === "in process") {
            return {color: '#0288d1'}
        }
    }
    // ______________________________________________________________________________ //
 
    // Columns.
    const columnDefs = [   
        { 
            headerName: 'Name', 
            field: 'merchants_legal_name_title_case', 
            editable: false, 
            cellClass: 'name-column',
            cellRenderer: NameCellRenderer
        },
        { headerName: 'Date Submitted',   field: 'created',                                                                      ...wrap },
        { headerName: 'RTR',              field: 'balance'                                                                               },
        { headerName: 'RTR + LEGAL',      field: 'rtr_legal',                                                                    ...wrap }, 
        { headerName: 'FULL',             field: 'total'                                                                                 },
        { headerName: 'Suit Status',      field: 'suit_status',       cellStyle: params => filedUnfiledstyle(params)                     },
        { headerName: 'AOS',              field: 'aos',               cellStyle: params => filedUnfiledstyle(params)                     },
        { headerName: 'Date Served',      field: 'date_served',       cellStyle: params => dateServedStyle(params),              ...wrap },
        { headerName: 'Default Judgment', field: 'default_judgment',  cellStyle: params => defJudgment(params), editable: false, ...wrap },
        { headerName: 'UCC Satuts',       field: 'ucc_status',        cellStyle: params => uccStyle(params)                              },   
        { headerName: 'Law Firm',         field: 'law_firm'                                                                              },
        { headerName: 'Notes',            field: 'notes',                                                                resizable: true }
    ]
    
    // Column settings.
    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: true,
        suppressMovable: true,
        resizable: false,
    }), [])

    // AG grid.
    return (
        <Container disableGutters className='ag-theme-quartz' sx={gridStyle} style={{ maxWidth: isLgScr ? "2400px" : '100%'}}>
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
                autoSizeStrategy={autoSizeStrategy}
            />
        </Container>
    )
}
export default DealList