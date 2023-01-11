import { Box, Drawer } from '@mui/material';
import React from 'react'
import style from './JetSidebar.module.css';

interface ISidebar {
    children: React.ReactNode,
}

const JetSidebar: React.FC<ISidebar> = (props) => {
  return (
    <>
        <Drawer
            variant="permanent"
            anchor={'left'}
            open={true}
            sx={{
                width: 300,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 300,boxSizing: 'border-box', zIndex:-1,  },
            }}
        >
            <Box 
                className={style.sidebarContainer}
            >
                {props.children}
            </Box>
        </Drawer>
    </>
  )
}

export default JetSidebar