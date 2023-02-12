import React from 'react'
import { CircularProgress } from '@mui/material';

const JetSpinner: React.FC<{}> = () => {
    return (
        <CircularProgress thickness={3} size={85}/>
    );
}

export default JetSpinner;