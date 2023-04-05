import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material';
import JetCartTotal from './JetCartTotal';
import JetBankCard from '../common/JetBankCard';
import JetCartList from './CartList/JetCartList';
import JetDialog from '../common/JetDialog';
import { flexAround } from '../../themes/commonStyles';
import { cartActions, createPayment, deleteOrder, updateCart, updateOrder } from '../../store/slices/cartSlice';
import { Close } from '@mui/icons-material';
import * as cartSelectors from '../../store/selectors/cartSelectors';
import * as catalogSelectors from '../../store/selectors/catalogSelectors';
import style from './JetCart.module.css';
import { IFullOrder, IUpdateOrder } from '../../models/order';
import { ICreatePayment, IUpdateCart, PaymentDetailsForm } from '../../models/cart';


const JetCart: React.FC<{}> = () => {
    const orders = useAppSelector(cartSelectors.orders);
    const cartId = useAppSelector(cartSelectors.cartId);

    const dispatch = useAppDispatch();
    const [dialog, handleDialog] = useState<boolean>(false);
    

    let totalPrice: number = 0;
    orders.map(order => {
        totalPrice += order.productPrice * order.count;
    })

    const onOpenDialog = () => { handleDialog(true); }

    const onCloseDialog = () => { handleDialog(false); }

    const removeCartItem = async (orderId: string) => {
        if(!!cartId) {
            try {
                await dispatch(deleteOrder({orderId, cartId}));
            } catch (error) {
                console.error('ERR: removeCartItem()');
            }
        }
        
    }

    const incremntQty = async (cartItem: IFullOrder) => {
        if(!!cartId) {
            const order: IUpdateOrder = {
                productId: cartItem.productId,
                cartId: cartId,
                orderId: cartItem.id,
                count: cartItem.count + 1
            }
            try {
                await dispatch(updateOrder(order))
            } catch (error) {
                console.error('ERR: incremntQty()');
            }
        }
    }

    const decrementQty = async (cartItem: IFullOrder) => {
        if(!!cartId) {
            const order: IUpdateOrder = {
                productId: cartItem.productId,
                cartId: cartId,
                orderId: cartItem.id,
                count: cartItem.count - 1
            }
            try {
                if(cartItem.count - 1 == 0) {
                    await dispatch(deleteOrder({orderId: cartItem.id, cartId}));
                    return;
                }
                await dispatch(updateOrder(order))
            } catch (error) {
                console.error('ERR: decrementQty()');
            }
        }
    }

    const onConfirmPay = async (details: PaymentDetailsForm) => {
        if(details.paymentType == 'bankCard') {
            onOpenDialog();
        }
        
        
        if(!!cartId) {
            try {
                const updateCartData: IUpdateCart = {...details, cartId: cartId};
                const paymentData: ICreatePayment = {cartId: cartId, payment: true};
                console.log('updateCartData', updateCartData);
                console.log('paymentData', paymentData)
                await dispatch(updateCart(updateCartData)); 
                await dispatch(createPayment(paymentData));
            } catch (error) {
                console.error('ERR: onConfirmPay');
            }
        }
    }

    

    useEffect(() => {

    }, [])

    return (
        <>
            { !!orders.length && <Box className={style.cartTitle}>Корзина</Box> }
            <Box sx={flexAround} className={style.cartContainer}>
                {
                    !(!!orders.length)
                    ?
                        <Box className={style.noItems}>
                            <h1>Корзина пуста</h1>
                        </Box>
                    :
                        <>
                            <JetCartList 
                                orders={orders} 
                                removeCartItem={removeCartItem} 
                                incremntQty={incremntQty}
                                decrementQty={decrementQty}
                            />
                            <JetCartTotal 
                                totalPrice={totalPrice} 
                                onConfirmPay={onConfirmPay}
                            />
                        </>
                }

            </Box>
            <JetDialog open={dialog} onClose={onCloseDialog}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                    <Box sx={{ fontSize: '24px' }}>
                        Оформление заказа
                    </Box>
                    <IconButton sx={{ cursor: 'pointer' }} onClick={onCloseDialog}>
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