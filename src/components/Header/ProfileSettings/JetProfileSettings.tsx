import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { flexCenter } from '../../../themes/commonStyles';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import JetMenu from '../../common/JetMenu';
import JetDialog from '../../common/JetDialog';
const JetProfileSettings: React.FC<{}> = () => {
    const [anchormElm, setAnchormElm] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);

    const [dialog, handleDialog] = useState<boolean>(false);

    const handleCloseMenu = () => {
        setAnchormElm(null);
        setOpenMenu(false);
    }

    const handleClickMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchormElm(e.currentTarget);
        setOpenMenu(true);
    }

    const onOpenDialog = () => {
        handleDialog(true);
    }

    const onCloseDialog = () => {
        handleDialog(false);
    }

    const tmpMenuItems = [
        {id: 1, txt: 'Профиль', icon: { name: 'jet-account-outline', style: {mr:1} }, method: handleCloseMenu},
        {id: 2, txt: 'Зарегистрироваться', icon: { name: 'jet-add-person', style: {mr:1} }, method: handleCloseMenu},
        {id: 3, txt: 'Стать поставщиком', icon: { name:'jet-add-group-outline', style: {mr:1} }, method: handleCloseMenu},
        {id: 4, txt: 'Выйти', icon: { name:'jet-logout', style: {mr:1} }, color: '#f44336', method: handleCloseMenu},
    ]
    
    return(
        <>
            <Box sx={flexCenter}>
                <Stack>
                    <Button onClick={onOpenDialog}>
                        <LanguageIcon fontSize='medium'/>
                    </Button>
                    <Button
                        onClick={handleClickMenu}
                        sx={{
                            borderRadius:10,
                            border: '1px solid #ddd'
                        }}
                    >
                        <Stack>
                            <MenuIcon fontSize='medium' />
                            <AccountCircleIcon fontSize='medium' />
                        </Stack>

                    </Button>
                </Stack>
            </Box>

           <JetMenu 
                open={openMenu} 
                onClose={handleCloseMenu}  
                anchorEl={anchormElm} 
                menuItems={tmpMenuItems}
            /> 

           <JetDialog
                open={dialog} 
                onClose={onCloseDialog} 
                title="Modal title" 
                content="Text TextTextTex tTextText TextTextTe xtTextTextTe xtText TextT extTex tTex tTextTe xtTex tTextTe xtT extText TextTex tTe xtTex tTextTextTe xtTextTextTe xtTextTex tTextTextTextT extTextText TextTextTex tTextTex tTextTex tTextT extTextTextText" 
           />
           
      </>
    );
}

export default JetProfileSettings;