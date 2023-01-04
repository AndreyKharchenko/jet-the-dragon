import { Box, Container } from '@mui/material'
import React from 'react'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetOptionsTab from '../components/OptionsTab/JetOptionsTab'
import JetProduct from '../components/Product/JetProduct'


const ProductPage:React.FC<{}> = () => {
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
          <Container maxWidth="xl" sx={{m: '2rem auto', height:'100%'}}>
            <JetProduct />
          </Container>
        </Box>
        <Box>
          <JetFooter />
        </Box>
    </Box>
  )
}

export default ProductPage