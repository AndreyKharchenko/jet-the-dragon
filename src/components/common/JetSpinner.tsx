import React from 'react'
import { CircularProgress } from '@mui/material';

interface IJetSpinner {
    size: number,
    color?: 'error' | 'primary'
}

const JetSpinner: React.FC<IJetSpinner> = ({size, color}) => {
    return (
        <CircularProgress thickness={3} size={size} color={color} />
    );
}

export default JetSpinner;