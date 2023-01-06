import React from 'react'
import { Box, Container } from '@mui/material'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetOptionsTab from '../components/OptionsTab/JetOptionsTab'
import JetSupplier from '../components/Supplier/JetSupplier'

const SupplierPage: React.FC<{}> = () => {
  return (
    <Box sx={{display: 'flex',flexDirection: 'column', height: '100vh'}}>
        <Box>
          <JetHeader headerType='product' />
          <JetOptionsTab />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: 100,
          overflowY: 'scroll',
        }}>
          <Container maxWidth="xl" sx={{height:'100%'}}>
            <JetSupplier />
          </Container>
        </Box>
        <Box>
          <JetFooter />
        </Box>
    </Box>
  )
}

export default SupplierPage