import React, { useState } from 'react';
import { Badge, Box, Button, IconButton, Stack, Menu, TextField } from '@mui/material';
import { flexAround, flexBetween, flexCenter } from '../../../themes/commonStyles';
import {KeyboardArrowDown,KeyboardArrowUp, AccountCircle, ShoppingCartOutlined, Close} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import JetMenu from '../../common/JetMenu';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';
import style from '../JetHeader.module.css';
import { useInput } from '../../../hooks/useInput';

const JetHeaderUtils: React.FC<{}> = () => {
    const [anchormElm, setAnchormElm] = useState<null | HTMLElement>(null);
    const [listMenu, setListMenu] = useState<boolean>(false);
    const [regMenu, setRegMenu] = useState<boolean>(false);
    const [regChange, setRegChange] = useState<boolean>(false);
    const input = useInput();
    const products = useAppSelector(state => state.cart.products);
    const navigate = useNavigate();

    const onCloseListMenu = () => {
        setAnchormElm(null);
        setListMenu(false);
    }

    const onOpenListMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchormElm(e.currentTarget);
        setListMenu(true);
    }

    const onOpenReg = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchormElm(e.currentTarget);
        setRegMenu(true);
    }

    const onCloseReg = () => {
        setRegChange(false);
        setRegMenu(false);
    }

    const onLogin = (loginType: string) => { navigate(`/login/${loginType}`); }
    const onCart = () => { navigate('/cart'); }

    const tmpMenuItems = [
        {id: 1, txt: 'Профиль', icon: { name: 'jet-account-outline', style: {mr:1} }, method: onCloseListMenu},
        {id: 2, txt: 'Зарегистрироваться', icon: { name: 'jet-add-person', style: {mr:1} }, method: () => onLogin('user')},
        {id: 3, txt: 'Стать поставщиком', icon: { name:'jet-add-group-outline', style: {mr:1} }, method: () => onLogin('provider')},
        {id: 4, txt: 'Выйти', icon: { name:'jet-logout', style: {mr:1} }, color: '#f44336', method: onCloseListMenu},
    ]

    const mocRegion = 'Краснодарский край';
    
    return(
        <>
            <Box sx={flexCenter}>
                <Stack>
                    <Button 
                        onClick={(e) => onOpenReg(e)} 
                        endIcon={regMenu ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        className={style.regionBtnMenu}
                    >
                        {mocRegion}
                    </Button>
                    <Button
                        onClick={onOpenListMenu}
                        sx={{
                            borderRadius:10,
                            border: '1px solid #ddd'
                        }}
                    >
                        <Stack>
                            <MenuIcon fontSize='medium' />
                            <AccountCircle fontSize='medium' />
                        </Stack>

                    </Button>
                    <IconButton onClick={onCart} color='primary'>
                        <Badge badgeContent={products.length} color="primary">
                            <ShoppingCartOutlined fontSize="medium" />
                        </Badge>
                    </IconButton>
                </Stack>
            </Box>

           <JetMenu 
                open={listMenu} 
                onClose={onCloseListMenu}  
                anchorEl={anchormElm} 
                menuItems={tmpMenuItems}
            /> 

            <Menu
                className={style.ksks}
                open={regMenu}   
                anchorEl={anchormElm}
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }} 
                sx={{left:'-60px'}}         
            >
                <Box className={style.regionContainer}>
                    <Box sx={{...flexBetween, alignItems: 'flex-start', padding:'0 10px', mt:1, mb:2}}>
                        <Box className={style.regionTxt}>
                            {
                                (regChange) ? "Укажите ваш регион" : "Ваш регион"
                            }
                        </Box>
                        <Box sx={{mt:-0.8}}>
                            <IconButton onClick={(regChange) ? () => setRegChange(false) : onCloseReg}>
                                <Close fontSize='small' color='primary'/>
                            </IconButton>
                        </Box>
                    </Box>
                    {
                        (regChange) 
                        ?
                        <Box className={style.regInput}>
                            <TextField 
                                label="Ваш регион" 
                                variant="outlined" 
                                {...input} 
                                InputLabelProps={{shrink: true}}
                            />
                        </Box>
                        :
                        <Box sx={{...flexBetween, padding:'0 10px'}}>
                            <Box className={style.regName}>{mocRegion}</Box>
                            <Box>
                                <Button 
                                    variant="text" 
                                    className={style.regChangeBtn}
                                    onClick={() => setRegChange(true)}
                                >
                                    Изменить
                                </Button>
                            </Box>
                        </Box>
                    }
                    
                </Box>
            </Menu>
      </>
    );
}

export default JetHeaderUtils;