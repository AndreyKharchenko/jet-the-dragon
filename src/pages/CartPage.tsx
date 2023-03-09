import React from 'react';
import { Box, Container } from '@mui/material';
import JetHeader from "../components/Header/JetHeader";
import JetFooter from '../components/Footer/JetFooter';
import JetCart from '../components/Cart/JetCart';
import JetOptionsTab from '../components/OptionsTab/JetOptionsTab';

const CartPage:React.FC<{}> = () => {
    
    return (
        <Box sx={{display: 'flex',flexDirection: 'column', height: '100vh'}}>
            <Box>
                <JetHeader headerType='cart' />
                <JetOptionsTab />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: 100,
                overflowY: 'scroll'
            }}>
                <Container maxWidth="xl" sx={{mb:0, height:'100%'}}>
                    <JetCart />
                </Container>
            </Box>
            <Box>
                <JetFooter />
            </Box>
        </Box>
    )
}

export default CartPage;