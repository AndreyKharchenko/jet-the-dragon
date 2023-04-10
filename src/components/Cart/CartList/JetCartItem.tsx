import React from 'react'
import { Avatar, Box, Button, ButtonGroup, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Remove, Add, Place, Close } from '@mui/icons-material';
import { flexAround, flexBetweenCenter } from '../../../themes/commonStyles';
import style from '../JetCart.module.css';
import moment from 'moment';
import { IFullOrder } from '../../../models/order';
import { getImage } from '../../../utils/utils';

interface ICartItem {
    order: IFullOrder,
    removeCartItem: (id: string) => void,
    decrementQty: (cartItem: IFullOrder) => void,
    incremntQty: (cartItem: IFullOrder) => void,
}

const JetCartItem: React.FC<ICartItem> = ({ order, removeCartItem, decrementQty, incremntQty }) => {
    return (
        <>
            <ListItem
                className={style.cartItem}
                key={order.id}
            >
                <Box className={style.cartItemContainer}>
                    <Box className={style.cartItemHeader} sx={flexBetweenCenter}>
                        <Box>{order.productName}</Box>
                        <Box>
                            <IconButton onClick={() => removeCartItem(order.id)} color='primary'>
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 3 }} />
                    <Box sx={{ ...flexAround, mt: 2 }}>
                        <ListItemAvatar className={style.cartItemAvatar}>
                            <Avatar
                                sx={{ width: '100px', height: '100px' }}
                                src={getImage(order.productImage)}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box className={style.cartProductName}>
                                    {order.productName},
                                    <Typography component='span'>
                                        Количество: {(order.productUnit == 'PACK') ? order.count + ' шт' : order.count * 1000 + ' гр'}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <React.Fragment>
                                    <Box>
                                        <Place fontSize='small' color='primary' sx={{ mb: -0.5 }} />
                                        {`Дата доставки: ${moment(order.productManufactureDate).add(2, 'days').format('DD.MM.YYYY')}`}
                                    </Box>
                                    {order.productUnit == '1000GRM' && <Box sx={{ ml: 2.2 }}>{'Цена за 1000 грамм'}</Box>}
                                    {order.productUnit == 'PACK' && <Box sx={{ ml: 2.2 }}>{'Цена за 1 штуку'}</Box>}
                                </React.Fragment>
                            }

                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box className={style.cartItemPrice}>
                                {`${order.productPrice * order.count} ₽`}
                            </Box>
                            <Box>
                                <ButtonGroup>
                                    <Button
                                        onClick={() => decrementQty(order)}
                                    >
                                        <Remove fontSize="small" />
                                    </Button>
                                    <Button
                                        onClick={() => incremntQty(order)}
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