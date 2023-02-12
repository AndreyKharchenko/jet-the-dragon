import React from 'react'
import { Avatar, Box, Button, ButtonGroup, Chip, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import {Remove, Add, Place} from '@mui/icons-material';
import { IProduct } from '../../../models/product';
import { flexAround } from '../../../themes/commonStyles';
import style from '../JetCart.module.css';

interface ICartItem {
    product: IProduct,
    removeCartItem: (cartItem: IProduct) => void,
    decrementQty: (id: number) => void,
    incremntQty: (id: number) => void,
}

const JetCartItem: React.FC<ICartItem> = ({ product, removeCartItem, decrementQty, incremntQty }) => {
    return (
        <>
            <ListItem
                className={style.cartItem}
                key={product.id}
            >
                <Box className={style.cartItemContainer}>
                    <Box className={style.cartItemHeader}>
                        Доставка курьером или у продавца
                    </Box>
                    <Divider sx={{ mt: 3 }} />
                    <Box sx={{ ...flexAround, mt: 2 }}>
                        <ListItemAvatar className={style.cartItemAvatar}>
                            <Avatar
                                src={product.image}
                                sx={{ width: '100px', height: '100px' }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box className={style.cartProductName}>
                                    {product.name}, <Typography component='span'>Количество: {product.qty}</Typography>
                                </Box>
                            }
                            secondary={
                                <React.Fragment>
                                    <Box>
                                        <Place fontSize='small' color='primary' sx={{mb:-0.5}}/>{`Дата доставки: 27.02.2023`}
                                    </Box>
                                    <Box sx={{ml: 2.2}}>{'500 гр'}</Box>
                                    <Box sx={{ml: 2.2}}>{'Цена за 1 кг'}</Box>
                                </React.Fragment>
                            }
                            
                        />
                        <Box sx={{display:'flex', flexDirection: 'column'}}>
                            <Box className={style.cartItemPrice}>{product.price * product.qty} ₽</Box>
                            <Box>
                                <ButtonGroup>
                                    <Button
                                        onClick={() => decrementQty(product.id)}
                                    >
                                        <Remove fontSize="small" />
                                    </Button>
                                    <Button
                                        onClick={() => incremntQty(product.id)}
                                    >
                                        <Add fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ListItem>
        </>
    )
}

export default JetCartItem