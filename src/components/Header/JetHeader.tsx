import React from "react";
import JetLogo from "../common/JetLogo";
import JetSearch from "./Search/JetSearch";
import JetProfileSettings from "./ProfileSettings/JetProfileSettings";
import { flexBetweenCenter, dFlex } from "../../themes/commonStyles";
import { Box, Container } from "@mui/material";
const JetHeader: React.FC<{}> = () => {
    return(
        <Box 
            sx={{
                ...dFlex, 
                minHeight:70, 
                borderBottom: '1px solid #ddd'
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{
                    ...flexBetweenCenter,
                    minHeight: 90,
                    px: 4
                }}>
                    <JetLogo />
                    <JetSearch />
                    <JetProfileSettings />
                </Box>
            </Container>
        </Box>
    );
}

export default JetHeader;