import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material';
import JetCartTotal from './JetCartTotal';
import JetBankCard from '../common/JetBankCard';
import JetCartList from './CartList/JetCartList';
import JetDialog from '../common/JetDialog';
import { flexAround } from '../../themes/commonStyles';
import { cartActions } from '../../store/slices/cartSlice';
import { IProduct } from '../../models/product';
import {Close} from '@mui/icons-material';
import * as cartSelectors from '../../store/selectors/cartSelectors';
import style from './JetCart.module.css';


const JetCart: React.FC<{}> = () => {
    const products = useAppSelector(cartSelectors.products);
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
        <Box className={style.cartTitle}>Корзина</Box>
        <Box sx={flexAround} className={style.cartContainer}>
            {
                !(!!products.length)
                ?
                    <Box className={style.noItems}>
                        <h1>Корзина пуста</h1>
                    </Box>
                :
                    <>
                        <JetCartList 
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