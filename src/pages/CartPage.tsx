import { Box, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { cartActions } from '../store/slices/cartSlice';

const CartPage:React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state:any) => state.cart.products);
    const handleClick = () => {
        console.log('handleClick');
        dispatch(cartActions.addProduct(
            { id:1, name: 'Milk', kolvo:3 }
        ))
    }

    return (
        <Box sx={{display: 'flex',flexDirection: 'column', height: '100vh'}}>
            <Box><Button onClick={handleClick}>cart page</Button></Box>
            {
                products.map((product: any, index: number) => {
                    return <Box key={index}>{product.name}</Box>
                })
            }
        </Box>
    )
}

export default CartPage;