import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, IconButton, Stack, Menu, TextField, Tooltip } from '@mui/material';
import { flexBetween, flexCenter } from '../../../themes/commonStyles';
import {KeyboardArrowDown,KeyboardArrowUp, ShoppingCartOutlined, Close} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';
import style from '../JetHeader.module.css';
import { useInput } from '../../../hooks/useInput';
import JetIcon from '../../common/JetIcon';
import * as cartSelectors from '../../../store/selectors/cartSelectors';
import * as userSelectors from '../../../store/selectors/userSelectors';

interface IHeaderUtils {
    isSupplierBtn: boolean,
    onCustomer: () => void,
    onSupplier: () => void
}


const JetHeaderUtils: React.FC<IHeaderUtils> = ({isSupplierBtn, onCustomer, onSupplier}) => {
    const [anchormElm, setAnchormElm] = useState<null | HTMLElement>(null);
    const [regMenu, setRegMenu] = useState<boolean>(false);
    const [regChange, setRegChange] = useState<boolean>(false);
    const [location, setLocation] = useState<string>('');
    const input = useInput();
    const orders = useAppSelector(cartSelectors.orders);
    const customerCity = useAppSelector(userSelectors.customerCity);
    const supplierCity = useAppSelector(userSelectors.supplierCity);
    const userRole = useAppSelector(userSelectors.userRole);

    const navigate = useNavigate();

    const onOpenReg = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchormElm(e.currentTarget);
        setRegMenu(true);
    }

    const onCloseReg = () => {
        setRegChange(false);
        setRegMenu(false);
    }

    const onCart = () => { navigate('/cart'); }
    
    useEffect(() => {
        if(userRole == 'customer') {
            setLocation(customerCity || '');
        } else {
            setLocation(supplierCity || '');
        }
    },[])
    
    return(
        <>
            <Box sx={flexCenter}>
                <Stack>
                    <Button 
                        onClick={(e) => onOpenReg(e)} 
                        endIcon={regMenu ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        className={style.regionBtnMenu}
                    >
                        {location}
                    </Button>
                    <Box sx={{...flexBetween}}>
                        <Tooltip title="Войти">
                            <IconButton onClick={onCustomer} color='primary' size='large'>
                                <JetIcon icon='jet-account-outline' fontSize='medium' />
                            </IconButton>
                        </Tooltip>

                        {isSupplierBtn && <Tooltip title="Личный кабинет поставщика">
                            <IconButton onClick={onSupplier} color='primary' size='large'>
                                <JetIcon icon='jet-add-person' fontSize='medium' />
                            </IconButton>
                        </Tooltip>}
                            
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
                            <Box className={style.regName}>{location}</Box>
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