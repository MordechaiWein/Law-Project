import React, { useState, useContext} from "react"
import styles from '../styles/DocxTemplateGeneratorStyles'
import oneMerchantOneGuarantor from '../templates/1 Merchant 1 Guarantor.docx'
import oneMerchantTwoGuarantors from '../templates/1 Merchant 2 Guarantors.docx'
import soleProprietor from '../templates/Sole Proprietor.docx'
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
import CircularProgress from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PDFDocument } from "pdf-lib"
import { AppContext } from "../components/AppContext"

const defaultTheme = createTheme({ palette: { primary: { main: '#5d9bd5' }, secondary: { main: '#FF9900' } } })

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback)
}

function DocxTemplateGenerator({ merchant, setActionsFlag }) {

    const { editMerchant } = useContext(AppContext)

    let docToBeGenerated = null
    let exhibitPage = null

    if (merchant.second_guarantor) {
        docToBeGenerated = oneMerchantTwoGuarantors
    }
    else if (merchant.type_of_entity === "Sole Proprietorship" || merchant.first_guarantor === merchant.merchants_legal_name) {
        docToBeGenerated = soleProprietor
    } else {
        docToBeGenerated = oneMerchantOneGuarantor
    }
   
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
    const [isLoading, setIsLoading] = useState(false)
    const [generationError, setGenerationError] = useState("")
 
    const [buttonData, setButtonData] = useState({
        court: 'KINGS',
        entityShortName: null,
        firstGuarShortName: null,
        secondGuarShortName: null
    })

    const [fieldData, setFieldData] = useState({
        entityShortName: '',
        firstGuarShortName: '',
        secondGuarShortName: ''
    })

    const merchantsDocsSorted = merchant.document_info.sort((a, b) => {
        return a.filename.localeCompare(b.filename)
    })

    // Component functions...
    function addMasterDocToMerchantsDocuments(completedDoc) {

        const formData = new FormData()
        formData.append('id', merchant.id); 
        formData.append('merchants_legal_name', merchant.merchants_legal_name_title_case); 
        formData.append('master_doc', completedDoc)
    
        fetch('/add-master-doc-to-merches-docs', {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => editMerchant(data))
    }

    async function getExhibitPage(url) {
        await fetch('/find-exhibit-base-page', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: url})
        })
        .then(response => response.json())
        .then(data => exhibitPage = data.page_number)
    }

    async function addMerchantAttachments(generatedUrl) {
        await getExhibitPage(generatedUrl)

        const contractUrl =  merchantsDocsSorted[0].url
        const fundingConfUrl = merchantsDocsSorted[2].url
        const paymentHistUrl = merchantsDocsSorted[4].url

        const summonsComp = await fetch(generatedUrl).then((res) => res.arrayBuffer());

        const contract = await fetch(contractUrl).then((res) => res.arrayBuffer());
        const fundingConf = await fetch(fundingConfUrl).then((res) => res.arrayBuffer());
        const paymentHist = await fetch(paymentHistUrl).then((res) => res.arrayBuffer());

        const masterDocument = await PDFDocument.load(summonsComp);
        const readContract = await PDFDocument.load(contract);
        const readPaymentHist = await PDFDocument.load(paymentHist);

        const contractPages = readContract.getPages();
        const paymentHistPages = readPaymentHist.getPages();

        const contractLength = readContract.getPageCount();
        const paymentHistLength = readPaymentHist.getPageCount();

        const [existingPage] = masterDocument.getPages();
        const { width, height } = existingPage.getSize();

        let basePage = exhibitPage;

        for(let i = 0; i < contractLength; i++) {
            const embeddedPage = await masterDocument.embedPage(contractPages[i]);
            const contractPage = masterDocument.insertPage(basePage += 1, [width, height]);
            contractPage.drawPage(embeddedPage, {
                x: 0,
                y: 0,
                width: width,
                height: height
            });
        };

        basePage = exhibitPage;

        const embeddedPng = await masterDocument.embedPng(fundingConf);
        const pngDims = embeddedPng.scale(0.75);

        const imageInsertionIndex  = basePage + contractLength + 2;
        const imagePage = masterDocument.insertPage(imageInsertionIndex, [width, pngDims.height]);

        imagePage.drawImage(embeddedPng, {
            x: 0,
            y: 0,
            width: width,
            height: pngDims.height
        });

        let paymentInsertionIndex = imageInsertionIndex + 1;

        for(let i = 0; i < paymentHistLength; i++) {
            const embeddedPage = await masterDocument.embedPage(paymentHistPages[i]);
            const paymentPage = masterDocument.insertPage(paymentInsertionIndex += 1, [width, height]);
            paymentPage.drawPage(embeddedPage, {
                x: 0,
                y: 0,
                width: width,
                height: height
            });
        };

        paymentInsertionIndex = imageInsertionIndex + 1;

        const pdfBytes = await masterDocument.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        setIsLoading(false)
        saveAs(pdfBlob, `Summons & Complaint-${merchant.merchants_legal_name_title_case}.pdf`);
        addMasterDocToMerchantsDocuments(pdfBlob)
    }

    function convertDocxToPdf(generatedDocx) {
        const formData = new FormData()
        const docxFile = new File(
            [generatedDocx],
            'generated.docx', 
            {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        })
        formData.append('File', docxFile)
        setIsLoading(true)
        fetch("https://v2.convertapi.com/convert/docx/to/pdf?Secret=SvK6GnLScAtXBJ1W&StoreFile=true", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const pdfUrl = data.Files[0].Url
            addMerchantAttachments(pdfUrl)
        })
    }

    function handleGenerateClick(docType) {

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
        else if (
            (merchant.first_guarantor === merchant.merchants_legal_name || merchant.type_of_entity === "Sole Proprietorship") &&
            !additionalData.entityShortName
        ) {
            setGenerationError('Please fill in all required fields before generating the document.')
        }
        else if (
            !merchant.second_guarantor_title_case &&
            merchant.first_guarantor !== merchant.merchants_legal_name &&
            merchant.type_of_entity !== "Sole Proprietorship" &&
            (!additionalData.entityShortName || !additionalData.firstGuarShortName)
        ) {
            setGenerationError('Please fill in all required fields before generating the document.')
        }
        else {
            setGenerationError('')
            loadFile(
                docToBeGenerated,
                (error, content) => {
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip);
                    doc.setData({...merchant, ...additionalData});
                    doc.render();
                    const out = doc.getZip().generate({
                        type: 'blob',
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    });
                    if (docType === "word") {
                        saveAs(out, `Summons & Complaint-${merchant.merchants_legal_name_title_case}.docx`);
                    }
                    else if (docType === "pdf") {
                        convertDocxToPdf(out);
                    }
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
                {isLoading ? 
                    <Box sx={styles.loadingBox}>
                        <CircularProgress sx={styles.spinner}/>
                        <Typography sx={styles.loadingText}>
                            Generating the fully compiled summons and complaint document. Please wait...
                        </Typography>
                    </Box>
                    :
                    <Container disableGutters sx={styles.container}>
                        
                        <Typography sx={styles.title}>GENERATE LAWSUIT</Typography>

                        <Box sx={styles.box}>
                            <Typography sx={styles.boxTitle}>Court</Typography>
                            <Button
                                variant={buttonData.court === "KINGS" ? "contained" : "outlined"}
                                sx={buttonData.court === "KINGS" ? styles.selected : styles.select}
                                onClick={handleSelectClick}
                                disableRipple
                                name="court"
                                value="KINGS"
                            >
                                Kings
                            </Button>
                            <Button
                                variant={buttonData.court === "NASSAU" ? "contained" : "outlined"}
                                sx={buttonData.court === "NASSAU" ? styles.selected : styles.select}
                                onClick={handleSelectClick}
                                disableRipple
                                name="court"
                                value="NASSAU"
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
                        
                        {firstGArray.length > 0 && merchant.first_guarantor !== merchant.merchants_legal_name ?
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
                        <Box sx={styles.buttonBox}>
                            <Button variant="contained" disableRipple sx={styles.button} onClick={() => handleGenerateClick("word")}>
                                Generate Word Doc
                            </Button>
                            <Button variant="contained" disableRipple sx={styles.button} onClick={() => handleGenerateClick("pdf")}>
                                Generate Lawsuit
                            </Button>
                        </Box>
                        <Typography sx={styles.error}>{generationError}</Typography>

                    </Container>
                }
            </ThemeProvider>
        </Dialog>
    )
}
export default DocxTemplateGenerator