import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, List, ListItem, Typography } from '@mui/material';
import {IProduct} from '../../models/catalog';
import { flexBetween } from '../../themes/commonStyles';
import { ClearOutlined, Add, RemoveOutlined } from '@mui/icons-material';
import style from './JetCart.module.css';

interface ICartProducts {
    products: IProduct[],
    removeCartItem: (cartItem: IProduct) => void,
    decrementQty: (id: number) => void,
    incremntQty: (id: number) => void,
}

const JetCartProducts: React.FC<ICartProducts> = ({products, removeCartItem, decrementQty, incremntQty}) => {
    return (
        <Box className={style.cartItems}>
            <List>
                {
                        products.map(it => {
                            const productQty = it.price * it.qty;
                            return(
                                <ListItem key={it.id}>
                                    <Card className={style.cartItem} elevation={5}>
                                        <Box className={style.cartItemContent}>
                                            <CardMedia
                                                className={style.cartItemMedia}
                                                component="img"
                                                image={it.image}
                                            />
                                            <CardContent>
                                                <Box className={style.cartItemDetails}>
                                                    <h3>{it.name}</h3>
                                                    <h4>
                                                        {it.price}.00 * {it.qty} =  
                                                        <span> {productQty}.00 ₽</span>
                                                    </h4>
                                                </Box>     
                                            </CardContent>
                                        </Box>
                                        <Box className={style.cartItemActions}>
                                            <Box className={style.cartClearBtn}>
                                                <IconButton onClick={() => removeCartItem(it)}>
                                                    <ClearOutlined color='primary' fontSize='small' />
                                                </IconButton>
                                            </Box>
                                            <Box>
                                                <IconButton onClick={() => incremntQty(it.id)}>
                                                    <Add color='primary' fontSize='medium' />
                                                </IconButton>
                                                <IconButton onClick={() => decrementQty(it.id)}>
                                                    <RemoveOutlined color='primary' fontSize='medium' />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Card>
                                </ListItem>
                            )
                        })
                }
            </List>
        </Box>
    )
}

export default JetCartProducts