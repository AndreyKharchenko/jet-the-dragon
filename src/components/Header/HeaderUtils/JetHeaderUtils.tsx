import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, IconButton, Stack, Menu, TextField, Tooltip } from '@mui/material';
import { flexAround, flexBetween, flexCenter } from '../../../themes/commonStyles';
import {KeyboardArrowDown,KeyboardArrowUp, AccountCircle, ShoppingCartOutlined, Close} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import style from '../JetHeader.module.css';
import { useInput } from '../../../hooks/useInput';
import JetIcon from '../../common/JetIcon';
import { login, mgr } from '../../../api/userManager';
import * as cartSelectors from '../../../store/selectors/cartSelectors';
import * as authSelectors from '../../../store/selectors/authSelectors';
import { authActions } from '../../../store/slices/authSlice';


const JetHeaderUtils: React.FC<{}> = () => {
    const [anchormElm, setAnchormElm] = useState<null | HTMLElement>(null);
    const [regMenu, setRegMenu] = useState<boolean>(false);
    const [regChange, setRegChange] = useState<boolean>(false);
    const input = useInput();
    const orders = useAppSelector(cartSelectors.orders);
    const token = useAppSelector(authSelectors.accessToken);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onOpenReg = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchormElm(e.currentTarget);
        setRegMenu(true);
    }

    const onCloseReg = () => {
        setRegChange(false);
        setRegMenu(false);
    }

    const onLogin = async (loginType: string) => {
        
        if(token) {  
            navigate(`/my/main`); // Переход на личный кабинет
        } else {
            try {
                const t = await mgr.signinRedirectCallback();
                dispatch(authActions.userSigned({token: t}));
            } catch (error) {
                login();
            }
            
        }
        
    }
    const onCart = () => { navigate('/cart'); }

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
                    <Box sx={{...flexBetween}}>
                        <Tooltip title="Войти">
                            <IconButton onClick={() => onLogin('customer')} color='primary' size='large'>
                                <JetIcon icon='jet-account-outline' fontSize='medium' />
                            </IconButton>
                        </Tooltip>
                            
                        <Tooltip title='Корзина'>
                            <IconButton onClick={onCart} color='primary' size='large'>
                                <Badge badgeContent={orders.length} color="primary">
                                    <ShoppingCartOutlined fontSize="medium" />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>
            </Box>

            <Menu
                open={regMenu}   
                anchorEl={anchormElm}
                elevation={10}
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