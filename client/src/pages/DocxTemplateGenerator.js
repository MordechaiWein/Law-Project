import React, { useState } from "react"
import styles from '../styles/DocxTemplateGeneratorStyles'
import testDocument from '../templates/test document.docx'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme({ palette: { primary: { main: '#5d9bd5' }, secondary: { main: '#FF9900' } } })

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback)
}

function DocxTemplateGenerator({ merchant, setActionsFlag }) {
    
    // Calculate and format the current date.
    const options = { year: 'numeric', month: 'long', day: '2-digit' }
    const todaysDate = new Date().toLocaleDateString('en-US', options)

    // Get an array of each guarantor's name.
    const firstGArray = merchant.first_guarantor_title_case.split(" ").filter(word => word !== "")
    const secondGArray = merchant.second_guarantor_title_case.split(" ").filter(word => word !== "")
   
    // 1 - Get an array of the merchants name. 2 - Remove words "The", "LLC", "INC". 3 - Remove all ','...
    const rawEntityArray = merchant.merchants_legal_name_title_case.split(" ")
    const filteredEntityArray = rawEntityArray.filter(word => word !== "The" && word !== "LLC" && word !== "INC" && word !== "")
    const entityArray = filteredEntityArray.map(word => word.replace(/,/g, ''))

    // Component States...
    const [open, setOpen] = useState(true)
    const [generationError, setGenerationError] = useState("")

    const [buttonData, setButtonData] = useState({
        court: 'Kings',
        entityShortName: null,
        firstGuarShortName: null,
        secondGuarShortName: null
    })

    const [fieldData, setFieldData] = useState({
        entityShortName: '',
        firstGuarShortName: '',
        secondGuarShortName: ''
    })
  
    // Component functions...
    function handleGenerateClick() {

        const additionalData = {
            currentDate: todaysDate,
            court: buttonData.court,
            entityShortName:     buttonData.entityShortName     ? buttonData.entityShortName     : fieldData.entityShortName,
            firstGuarShortName:  buttonData.firstGuarShortName  ? buttonData.firstGuarShortName  : fieldData.firstGuarShortName,
            secondGuarShortName: buttonData.secondGuarShortName ? buttonData.secondGuarShortName : fieldData.secondGuarShortName
        }

        const allFieldsFilled = Object.values(additionalData).every(value => value)

        if (merchant.second_guarantor_title_case && !allFieldsFilled) {
            setGenerationError('Please fill in all required fields before generating the document.')
        } 
        else if (!merchant.second_guarantor_title_case && (!additionalData.entityShortName || !additionalData.firstGuarShortName)) {
            setGenerationError('Please fill in all required fields before generating the document.')
        } 
        else {
            setGenerationError('')
            loadFile(
                testDocument,
                (error, content) => {
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip);
                    doc.setData({...merchant, ...additionalData});
                    doc.render();
                    const out = doc.getZip().generate({
                        type: 'blob',
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    });
                    saveAs(out, `Summons & Complaint-${merchant.merchants_legal_name_title_case}.docx`);
                }
            )
        }
    }

    function handleSelectClick(event) {
        setButtonData({...buttonData, [event.target.name]: event.target.value})
        setFieldData({...fieldData, [event.target.name]: ""})
    }

    function handleChange(event) {
        setFieldData({...fieldData, [event.target.name]: event.target.value})
        setButtonData({...buttonData, [event.target.name]: ""})
    } 

    const handleClose = () => { setOpen(false); setActionsFlag(false); }

    return (

        <Dialog open={open} onClose={handleClose} PaperProps={{sx: styles.paperProps}}>
            <ThemeProvider theme={defaultTheme}>
                <Container disableGutters sx={styles.container}>
                    
                    <Typography sx={styles.title}>GENERATE LAWSUIT</Typography>

                    <Box sx={styles.box}>
                        <Typography sx={styles.boxTitle}>Court</Typography>
                        <Button
                            variant={buttonData.court === "Kings" ? "contained" : "outlined"}
                            sx={buttonData.court === "Kings" ? styles.selected : styles.select}
                            onClick={handleSelectClick}
                            disableRipple
                            name="court"
                            value="Kings"
                        >
                            Kings
                        </Button>
                        <Button
                            variant={buttonData.court === "Nassau" ? "contained" : "outlined"}
                            sx={buttonData.court === "Nassau" ? styles.selected : styles.select}
                            onClick={handleSelectClick}
                            disableRipple
                            name="court"
                            value="Nassau"
                        >
                            Nassau
                        </Button>
                    </Box>

                    <Divider/>

                    <Box sx={styles.box}>
                        <Typography sx={styles.boxTitle}>{merchant.merchants_legal_name_title_case}</Typography>
                        <Button
                            variant={buttonData.entityShortName === entityArray[0] ? "contained" : "outlined"}
                            sx={buttonData.entityShortName === entityArray[0] ? styles.selected : styles.select}
                            onClick={handleSelectClick}
                            disableRipple
                            name="entityShortName"
                            value={entityArray[0]}
                        >
                            {entityArray[0]}
                        </Button>
                        {entityArray[1] ?
                            <Button
                                variant={buttonData.entityShortName === entityArray[1] ? "contained" : "outlined"}
                                sx={buttonData.entityShortName === entityArray[1] ? styles.selected : styles.select}
                                onClick={handleSelectClick}
                                disableRipple
                                name="entityShortName"
                                value={entityArray[1]}
                            >
                                {entityArray[1]}
                            </Button>
                            :
                            <Typography sx={styles.empty}></Typography>
                        }
                        {entityArray[2] ?
                            <Button
                                variant={buttonData.entityShortName === entityArray[2] ? "contained" : "outlined"}
                                sx={buttonData.entityShortName === entityArray[2] ? styles.selected : styles.select}
                                onClick={handleSelectClick}
                                disableRipple
                                name="entityShortName"
                                value={entityArray[2]}
                            >
                                {entityArray[2]}
                            </Button>
                            :
                            <Typography sx={styles.empty}></Typography>
                        }
                        <TextField 
                            InputProps={{style: styles.textfield}}
                            color="secondary"
                            autoComplete="off"
                            onChange={handleChange}
                            placeholder="Enter custom..."
                            name="entityShortName" 
                            value={fieldData.entityShortName}   
                        />
                    </Box>

                    <Divider/>
                    
                    {firstGArray.length > 0 ?
                        <>
                            <Box sx={styles.box}>
                                <Typography sx={styles.boxTitle}>{merchant.first_guarantor_title_case}</Typography>
                                <Button
                                    variant={buttonData.firstGuarShortName === firstGArray[0] ? "contained" : "outlined"}
                                    sx={buttonData.firstGuarShortName === firstGArray[0] ? styles.selected : styles.select}
                                    onClick={handleSelectClick}
                                    disableRipple
                                    name="firstGuarShortName"
                                    value={firstGArray[0]}
                                >
                                    {firstGArray[0]}
                                </Button>
                                {firstGArray[1] ?
                                    <Button
                                        variant={buttonData.firstGuarShortName === firstGArray[1] ? "contained" : "outlined"}
                                        sx={buttonData.firstGuarShortName === firstGArray[1] ? styles.selected : styles.select}   
                                        onClick={handleSelectClick}
                                        disableRipple
                                        name="firstGuarShortName"
                                        value={firstGArray[1]}
                                    >
                                        {firstGArray[1]}
                                    </Button>
                                    :
                                    <Typography sx={styles.empty}></Typography>
                                }
                                {firstGArray[2] ?
                                    <Button
                                        variant={buttonData.firstGuarShortName === firstGArray[2] ? "contained" : "outlined"}
                                        sx={buttonData.firstGuarShortName === firstGArray[2] ? styles.selected : styles.select}
                                        onClick={handleSelectClick}
                                        disableRipple
                                        name="firstGuarShortName"
                                        value={firstGArray[2]}
                                    >
                                        {firstGArray[2]}
                                    </Button>
                                    :
                                    <Typography sx={styles.empty}></Typography>
                                }
                                <TextField 
                                    InputProps={{style: styles.textfield}}
                                    color="secondary"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    placeholder="Enter custom..."
                                    name="firstGuarShortName"
                                    value={fieldData.firstGuarShortName}   
                                />
                            </Box>

                            <Divider/>
                        </>
                        :
                        null
                    }
                    {secondGArray.length > 0 ?
                        <>
                            <Box sx={styles.box}>
                                <Typography sx={styles.boxTitle}>{merchant.second_guarantor_title_case}</Typography>
                                <Button
                                    variant={buttonData.secondGuarShortName === secondGArray[0] ? "contained" : "outlined"}
                                    sx={buttonData.secondGuarShortName === secondGArray[0] ? styles.selected : styles.select}
                                    onClick={handleSelectClick}
                                    disableRipple
                                    name="secondGuarShortName"
                                    value={secondGArray[0]}
                                >
                                    {secondGArray[0]}
                                </Button>
                                {secondGArray[1] ? 
                                    <Button
                                        variant={buttonData.secondGuarShortName === secondGArray[1] ? "contained" : "outlined"}
                                        sx={buttonData.secondGuarShortName === secondGArray[1] ? styles.selected : styles.select}
                                        onClick={handleSelectClick}
                                        disableRipple
                                        name="secondGuarShortName"
                                        value={secondGArray[1]}
                                    >
                                        {secondGArray[1]}
                                    </Button>
                                    :
                                    <Typography sx={styles.empty}></Typography>
                                }
                                {secondGArray[2] ?
                                    <Button
                                        variant={buttonData.secondGuarShortName === secondGArray[2] ? "contained" : "outlined"}
                                        sx={buttonData.secondGuarShortName === secondGArray[2] ? styles.selected : styles.select}
                                        onClick={handleSelectClick}
                                        disableRipple
                                        name="secondGuarShortName"
                                        value={secondGArray[2]}
                                    >
                                        {secondGArray[2]}
                                    </Button>
                                    :
                                    <Typography sx={styles.empty}></Typography>
                                }
                                <TextField 
                                    InputProps={{style: styles.textfield}}
                                    color="secondary"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    placeholder="Enter custom..."
                                    name="secondGuarShortName"
                                    value={fieldData.secondGuarShortName}   
                                />
                            </Box>

                            <Divider/>
                        </>
                        :
                        null
                    }
                    <Button variant="contained" disableRipple sx={styles.button} onClick={handleGenerateClick}>Generate Lawsuit</Button>

                    <Typography sx={styles.error}>{generationError}</Typography>

                </Container>
            </ThemeProvider>
        </Dialog>
    )
}
export default DocxTemplateGenerator