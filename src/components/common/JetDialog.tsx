import React from 'react'
import {Dialog} from '@mui/material'

type PropsType = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

const JetDialog: React.FC<PropsType> = (props) => {
    
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                {props.children}
            </Dialog>
        </>
    )
}

export default JetDialog;