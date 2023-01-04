import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import JetCartItems from './JetCartItems';
import JetCartTotal from './JetCartTotal';
import { defaultButton, flexAround } from '../../themes/commonStyles';
import { cartActions } from '../../store/slices/cartSlice';
import style from './JetCart.module.css';
import { IProduct } from '../../models/catalog';
import JetDialog from '../common/JetDialog';
import {Close} from '@mui/icons-material';
import JetBankCard from '../common/JetBankCard';

const JetCart: React.FC<{}> = () => {
    const products = useAppSelector(state => state.cart.products);
    const dispatch = useAppDispatch();
    const [dialog, handleDialog] = useState<boolean>(false);
    
    let totalPrice:number = 0;
    products.map(product => {
        totalPrice += product.price * product.qty;
    })

    const removeCartItem = (cartItem: IProduct) => {
        dispatch(cartActions.removeProduct(cartItem));
    }

    const incremntQty = (id: number) => {
        dispatch(cartActions.incrementQty({id}))
    }

    const decrementQty = (id: number) => {
        dispatch(cartActions.decrementQty({id}))
    }

    const onOpenDialog = () => {
        handleDialog(true);
    }

    const onCloseDialog = () => {
        handleDialog(false);
    }

    return (
        <>
        <Box sx={flexAround} className={style.cartContainer}>
            {
                !(!!products.length)
                ?
                    <Box className={style.noItems}>
                        <h1>Корзина пуста</h1>
                    </Box>
                :
                    <>
                        <JetCartItems 
                            products={products} 
                            removeCartItem={removeCartItem} 
                            incremntQty={incremntQty}
                            decrementQty={decrementQty}
                        />
                        <JetCartTotal 
                            totalPrice={totalPrice} 
                            onCheckout={onOpenDialog}
                        />
                    </>
            }
            
        </Box>
        <JetDialog open={dialog}  onClose={onCloseDialog}>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700'}}>
                <Box sx={{fontSize:'24px'}}>
                    Оформление заказа
                </Box>
                <IconButton sx={{cursor: 'pointer'}} onClick={onCloseDialog}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <JetBankCard />
            </DialogContent>
        </JetDialog>
        </>
    )
}

export default JetCart;