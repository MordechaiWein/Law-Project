import React, { useState, useContext, useMemo } from 'react'
import styles from '../styles/MerchantStyles'
import MerchantData from './MerchantData'
import MerchantsPageTab from '../pages/MerchantsPageTab'
import MerchantOperations from '../pages/MerchantOperations'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import { useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppContext } from "./AppContext"
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const theme = createTheme({ breakpoints: { values: { xs: 0, sm: 1200, md: 1500, lg: 1850 } } })

function MerchantsPage() {
    
    const isLgScr = useMediaQuery('(min-width: 1850px)')
    const isSmScr = useMediaQuery('(max-width: 1230px)')
    
    const params = useParams()
    const history = useHistory()

    const { merchants } = useContext(AppContext)
    const modifiedName = params.name.replace(/-/g, ' ')
    
    const merchant = useMemo(
        () => merchants.find(merchant => merchant.merchants_legal_name_title_case === modifiedName) || {},
        [merchants, modifiedName]
    )

    const [dataPageFlag, setDataPageFlag] = useState(false)

    const leftGrid = [
        {id: 1,  key: 'Guarantor # 1 Name',       value: merchant.first_guarantor_title_case                                  },
        {id: 2,  key: 'Guarantor # 1 Email',      value: merchant.email_address                                               },
        {id: 3,  key: 'Guarantor # 1 Phone',      mobile: `MB: ${merchant.mobile}`, business: `BS: ${merchant.business_phone}`},
        {id: 4,  key: 'Guarantor # 2 Name',       value: merchant.second_guarantor_title_case                                 },
        {id: 5,  key: 'Guarantor # 2 Email',      value: merchant.second_guarantor_email                                      },
        {id: 6,  key: 'Guarantor # 2 Phone',      value: merchant.second_guarantor_phone                                      },
        {id: 7,  key: 'Lawyer / Debt Settlement', value: merchant.lawyer                                                      },
        {id: 8,  key: 'Lawyer Email',             value: merchant.lawyer_email                                                },
        {id: 9,  key: 'Lawyers Phone',            value: merchant.lawyer_phone                                                },
        {id: 10, key: 'Lawsuit Status',           value: merchant.suit_status                                                 },
        {id: 11, key: 'Litigation Date',          value: merchant.litigation_date                                             },
        {id: 12, key: 'Response Date',            value: merchant.response_date                                               }
    ]
     
    const rightGrid = [
        {id: 13, key: 'RTR',                     value: merchant.balance                                                      },
        {id: 14, key: 'RTR + Legal',             value: merchant.rtr_legal                                                    },
        {id: 15, key: 'Full',                    value: merchant.total                                                        },
        {id: 16, key: '6-month payback amount',  value: merchant.balance_pb_amount                                            },
        {id: 17, key: '6-month payback amount',  value: merchant.rtr_legal_pb_amount                                          },
        {id: 18, key: '6-month payback amount',  value: merchant.total_pb_amount                                              },
        {id: 19, key: 'Contract Payoff Date',    value: merchant.contract_payoff_date                                         },
        {id: 20, key: 'Remittance',              value: `${merchant.remittance} - ${merchant.payment_frequency}`              },
        {id: 21, key: '6-month payoff date',     value: merchant.six_month_payoff_date                                        },
        {id: 22, key: 'Service',                 value: merchant.service                                                      },
        {id: 23, key: 'Affidavit Of Service',    value: merchant.aos                                                          },
        {id: 24, key: 'UCC',                     value: merchant.ucc_status                                                   }
    ]

    const merchantGridLeft  = leftGrid.map(row  => <MerchantsPageTab key={row.id} row={row} />)
    const merchantGridRight = rightGrid.map(row => <MerchantsPageTab key={row.id} row={row} />)

    return (
    
        <ThemeProvider theme={theme}>
            <Container style={{ maxWidth: isLgScr ? "2700px" : "100%" }} sx={isLgScr ? styles.contLg : styles.contSm}>
                {dataPageFlag ? 
                    <MerchantData merchant={merchant} setDataPageFlag={setDataPageFlag}/>
                    :
                    <>
                        <Box sx={styles.headerBox}>
                            <ArrowBackSharpIcon sx={styles.arrowIcon} onClick={() => history.goBack()}/>
                            <Typography sx={styles.pageName}>{merchant.merchants_legal_name}</Typography>
                            <Link to="/"><HomeIcon sx={styles.homeIcon}/></Link>
                        </Box>

                        <Box sx={styles.dashboard}>
                            <Box sx={styles.gridBox}>
                                <Grid container spacing={1} sx={styles.leftGrid}>{merchantGridLeft}</Grid>
                                <Grid container spacing={1} sx={styles.rightGrid}>{merchantGridRight}</Grid>
                            </Box>
                            <Typography sx={styles.dataPage} onClick={() => setDataPageFlag(true)}>Data</Typography>
                        </Box>

                        <Divider />

                        <MerchantOperations isSmScr={isSmScr} merchant={merchant} paramsName={params.name}/>
                    </>
                }
            </Container>
        </ThemeProvider>
    )
}
export default MerchantsPage