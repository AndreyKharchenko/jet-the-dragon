import React from 'react'
import { Box, Button, Container, Link, Paper, Stack } from '@mui/material';
import { flexBetweenCenter, fullWidthFlex, justifyCenter } from '../../themes/commonStyles';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
const JetFooter: React.FC<{}> = (props) => {
    const footerLinks = [
        {id:1, text: 'Privacy', url: "#"},
        {id:2, text: 'Terms', url: "#"},
        {id:3, text: 'SiteMap', url: "#"},
        {id:4, text: 'Destinatin', url: "#"},
    ]
  return (
    <Box sx={{...fullWidthFlex, borderTop: '1px solid #ddd'}}>
        <Container maxWidth='xl'>
            <Box sx={{...flexBetweenCenter, width: '100%'}}>
                <Stack>
                    <Paper>
                        <Link href='#'>2022 Eco Space Copyright</Link>
                    </Paper>
                    {
                        footerLinks.map((link) => {
                            return(
                                <Paper key={link.id}>
                                    <Link href={link.url}>{link.text}</Link>
                                </Paper>
                            )
                        })
                    }
                </Stack>

                <Stack>
                    <Paper sx={justifyCenter}>
                        <Button sx={{color: theme => theme.palette.secondary.main}}>
                            <Box sx={{...justifyCenter, mr:1, mb: 0.1}}>
                                <LanguageIcon fontSize='small'/>
                            </Box>
                            Rus
                        </Button>
                        <Button sx={{color: theme => theme.palette.secondary.main}}> RUB </Button>
                        <Button sx={{color: theme => theme.palette.secondary.main}}>
                            Support & Resources
                            <Box sx={{...justifyCenter, ml:1}}>
                                <KeyboardArrowUpOutlinedIcon fontSize='small' />
                            </Box>
                        </Button>
                    </Paper>
                </Stack>
            </Box>
        </Container>
    </Box>
  )
}

export default JetFooter;
