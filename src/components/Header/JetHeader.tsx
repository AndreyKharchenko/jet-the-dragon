import React from "react";
import JetLogo from "../common/JetLogo";
import JetSearch from "./Search/JetSearch";
import JetHeaderUtils from "./HeaderUtils/JetHeaderUtils";
import { flexBetweenCenter, dFlex } from "../../themes/commonStyles";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface IHeader {
    headerType?: string
}


const JetHeader: React.FC<IHeader> = ({headerType}) => {

    return(
        <Box 
            sx={{
                ...dFlex, 
                minHeight:70, 
                borderBottom: '1px solid #ddd'
            }}
        >
            {
                (!!headerType && headerType.toUpperCase() == 'MAIN' || !(!!headerType)) 
                ?
                    <Container maxWidth="xl">
                        <Box sx={{
                            ...flexBetweenCenter,
                            minHeight: 90,
                            px: 4
                        }}>
                            <JetLogo />
                            <JetSearch />
                            <JetHeaderUtils />
                        </Box>
                    </Container>
                :
                    <Container maxWidth="xl">
                        <Box sx={{
                            ...flexBetweenCenter,
                            minHeight: 90,
                            px: 4
                        }}>
                            <JetLogo />
                            <JetHeaderUtils />
                        </Box>
                    </Container>

            }
            
        </Box>
    );
}

export default JetHeader;