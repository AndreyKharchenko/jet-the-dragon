import React, { useState } from 'react';
import { Badge, Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import { flexCenter } from '../../../themes/commonStyles';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import { defaultButton } from '../../../themes/commonStyles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import JetMenu from '../../common/JetMenu';
import JetDialog from '../../common/JetDialog';
import { useNavigate } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAppSelector } from '../../../hooks/useRedux';

const JetHeaderUtils: React.FC<{}> = () => {
    const [anchormElm, setAnchormElm] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);

    const [dialog, handleDialog] = useState<boolean>(false);

    const products = useAppSelector(state => state.cart.products);

    const navigate = useNavigate();

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

    const onLogin = (loginType: string) => {
        navigate(`/login/${loginType}`);
    }

    const onCart = () => {
        navigate('/cart');
    }

    const tmpMenuItems = [
        {id: 1, txt: 'Профиль', icon: { name: 'jet-account-outline', style: {mr:1} }, method: handleCloseMenu},
        {id: 2, txt: 'Зарегистрироваться', icon: { name: 'jet-add-person', style: {mr:1} }, method: () => onLogin('user')},
        {id: 3, txt: 'Стать поставщиком', icon: { name:'jet-add-group-outline', style: {mr:1} }, method: () => onLogin('provider')},
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
                    <IconButton onClick={onCart} color='primary'>
                        <Badge badgeContent={products.length} color="primary">
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Badge>
                    </IconButton>
                </Stack>
            </Box>

           <JetMenu 
                open={openMenu} 
                onClose={handleCloseMenu}  
                anchorEl={anchormElm} 
                menuItems={tmpMenuItems}
            /> 

            {/*<JetDialog
                open={dialog} 
                onClose={onCloseDialog} 
                title="Modal title" 
                content="Text TextTextTex tTextText TextTextTe xtTextTextTe xtText TextT extTex tTex tTextTe xtTex tTextTe xtT extText TextTex tTe xtTex tTextTextTe xtTextTextTe xtTextTex tTextTextTextT extTextText TextTextTex tTextTex tTextTex tTextT extTextTextText" 
                    />*/}
            <JetDialog open={dialog}  onClose={onCloseDialog}>
               <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700'}}>
                    <Box>
                        Modal title
                    </Box>
                    <IconButton sx={{cursor: 'pointer'}} onClick={onCloseDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                    Text TextTextTex tTextText TextTextTe xtTextTextTe xtText TextT extTex tTex tTextTe xtTex tTextTe xtT extText TextTex tTe xtTex tTextTextTe xtTextTextTe xtTextTex tTextTextTextT extTextText TextTextTex tTextTex tTextTex tTextT extTextTextText
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={onCloseDialog} sx={defaultButton}>
                        Закрыть
                    </Button>
                </DialogActions>
            </JetDialog>
           
      </>
    );
}

export default JetHeaderUtils;