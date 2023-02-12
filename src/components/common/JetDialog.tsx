import React from 'react'
import {Dialog} from '@mui/material'

type PropsType = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    fullwidth?: boolean
}

const JetDialog: React.FC<PropsType> = (props) => {
    
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                fullWidth={props.fullwidth || false}
                scroll={'paper'}
            >
                {props.children}
            </Dialog>
        </>
    )
}

export default JetDialog;