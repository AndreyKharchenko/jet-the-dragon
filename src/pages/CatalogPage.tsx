import React from "react";
import JetHeader from "../components/Header/JetHeader";
import JetOptionsTab from "../components/OptionsTab/JetOptionsTab";
import JetProductCards from "../components/ProductCards/JetProductCards";
import JetFooter from "../components/Footer/JetFooter";
import { Box, Container } from '@mui/material';

const CatalogPage: React.FC<{}> = () => {
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          }}>
            <Box>
                <JetHeader />
                <JetOptionsTab />
            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: 100,
                overflowY: 'scroll'
            }}>
                <Container maxWidth="xl" sx={{mb:3}}>
                    <JetProductCards />
                </Container>
            </Box>
            <Box>
                <JetFooter />
            </Box>
            
        </Box>
    );
}

export default CatalogPage;