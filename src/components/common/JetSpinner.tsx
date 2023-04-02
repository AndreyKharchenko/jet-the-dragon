import React from 'react'
import { CircularProgress } from '@mui/material';

interface IJetSpinner {
    size: number
}

const JetSpinner: React.FC<IJetSpinner> = ({size}) => {
    return (
        <CircularProgress thickness={3} size={size} />
    );
}

export default JetSpinner;