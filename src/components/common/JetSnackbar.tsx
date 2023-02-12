import React from 'react'
import { Alert, Snackbar } from '@mui/material'


interface ISnackbar {
    msg: string,
    open: boolean,
    severity: Severity,
    onClose: () => void
}

type Severity = 'error' | 'warning' | 'info' | 'success';

const JetSnackbar: React.FC<ISnackbar> = ({msg,open, severity, onClose}) => {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default JetSnackbar