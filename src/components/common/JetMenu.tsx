import React from 'react'
import JetIcon from './JetIcon';
import { Box, Menu, MenuItem } from '@mui/material';

type menuItem = {
    id: number,
    icon: {
        name: string,
        style: object
    }
    txt: string,
    color?: string,
    method?: () => void
}

type PropsType = {
    open: boolean,
    anchorEl: null | HTMLElement 
    onClose: () => void,
    menuItems: menuItem[]
}
const JetMenu: React.FC<PropsType> = (props) => {
    return(
        <Menu 
            anchorEl={props.anchorEl} 
            open={props.open}
            onClose={props.onClose}
        >
                {
                    props.menuItems.map((item, index) => {
                        return(
                            <MenuItem onClick={item.method} sx={{color: item.color}} key={index}> 
                                <Box sx={item.icon.style}>
                                    <JetIcon icon={item.icon.name} />
                                </Box>
                                {item.txt}
                            </MenuItem>
                        )
                    })
                }
        </Menu>
    );
}

export default JetMenu