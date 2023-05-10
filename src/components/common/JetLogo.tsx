import React from "react";
import { Box, Typography } from "@mui/material";
import { flexCenter } from "../../themes/commonStyles";
import AcUnitIcon from '@mui/icons-material/AcUnit';

type JetLogoProps = {
    color?: string
}

const JetLogo: React.FC<JetLogoProps> = ({color}) => {
    return(
        <Box sx={flexCenter}>
            {/*<AcUnitIcon fontSize="small" color={"primary"} />*/}
            <Typography sx={{
                ml:1,
                color: (!!color) ? color : theme => theme.palette.primary.main,
                //color: '#FFF',
                fontSize: '20px',
                fontWeight: 'bold'
            }} component='h3'>
                FOOD SPACE
            </Typography>
        </Box>
    );
}

export default JetLogo;