import React from "react";
import { Box, Typography } from "@mui/material";
import { flexCenter } from "../../themes/commonStyles";
import AcUnitIcon from '@mui/icons-material/AcUnit';

const JetLogo: React.FC<{}> = () => {
    return(
        <Box sx={flexCenter}>
            <AcUnitIcon fontSize="small" color={"primary"} />
            <Typography sx={{
                ml:1,
                color: theme => theme.palette.primary.main,
                //color: '#FFF',
                fontSize: '20px',
                fontWeight: 'bold'
            }} component='h3'>
                eco Space
            </Typography>
        </Box>
    );
}

export default JetLogo;