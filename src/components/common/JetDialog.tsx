import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { defaultButton } from '../../themes/commonStyles';

type otherBtns = {
    id: number,
    txt: string,
    method: () => void
}

type PropsType = {
    open: boolean,
    onClose: () => void,
    title: string | null | "",
    content: string | null | "",
    btns?: otherBtns[]
}

const JetDialog: React.FC<PropsType> = (props) => {
    
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700'}}>
                    <Box>
                        {props.title}
                    </Box>
                    <IconButton sx={{cursor: 'pointer'}} onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                        {props.content}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    {
                        (props.btns) 
                        ?
                        props.btns.map(btn => {
                            return(
                                <Button key={btn.id} autoFocus onClick={btn.method} sx={defaultButton}>
                                    {btn.txt}
                                </Button>
                            );
                        })
                        :
                        null
                    }

                    <Button autoFocus onClick={props.onClose} sx={defaultButton}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default JetDialog;