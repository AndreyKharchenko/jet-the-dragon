import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box } from '@mui/material';
import JetCartItems from './JetCartItems';
import JetCartTotal from './JetCartTotal';
import { flexAround } from '../../themes/commonStyles';
import { cartActions } from '../../store/slices/cartSlice';
import style from './JetCart.module.css';
import { IProduct } from '../../models/catalog';

const JetCart: React.FC<{}> = () => {

    const products = useAppSelector(state => state.cart.products);
    const dispatch = useAppDispatch();
    
    let totalPrice:number = 0;
    products.map(product => {
        totalPrice += product.price * product.qty;
    })

    const removeCartItem = (cartItem: IProduct) => {
        dispatch(cartActions.removeProduct(cartItem));
    }

    return (
        <Box sx={flexAround} className={style.cartContainer}>
            {
                !(!!products.length)
                ?
                    <Box className={style.noItems}>
                        <h1>No products in Cart</h1>
                    </Box>
                :
                    <>
                        <JetCartItems products={products} removeCartItem={removeCartItem} />
                        <JetCartTotal totalPrice={totalPrice} />
                    </>
            }
            


        </Box>
    )
}

export default JetCart;