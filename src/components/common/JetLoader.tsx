import React from 'react'
import { CircularProgress } from '@mui/material';

const JetLoader: React.FC<{}> = () => {
    return (
        <CircularProgress thickness={3} size={85}/>
    );
}

export default JetLoader;