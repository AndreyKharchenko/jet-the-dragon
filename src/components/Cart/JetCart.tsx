import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
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
import moment from 'moment';


const JetCart: React.FC<{}> = () => {
    const orders = useAppSelector(cartSelectors.orders);
    const cartId = useAppSelector(cartSelectors.cartId);

    const dispatch = useAppDispatch();
    const [paymentDialog, handlePaymentDialog] = useState<boolean>(false);
    const [confirmedDialog, handleConfirmedDialog] = useState<boolean>(false);

    let totalPrice: number = 0;
    orders.map(order => {
        totalPrice += order.productPrice * order.count;
    })

    const onOpenDialog = () => { handlePaymentDialog(true); }

    const onCloseDialog = () => { handlePaymentDialog(false); }

    const onCloseConfirmedDialog = () => { handleConfirmedDialog(false); }

    const removeCartItem = async (orderId: string) => {
        if (!!cartId) {
            try {
                await dispatch(deleteOrder({ orderId, cartId }));
            } catch (error) {
                console.error('ERR: removeCartItem()');
            }
        }

    }

    const incremntQty = async (cartItem: IFullOrder) => {
        if (!!cartId) {
            const order: IUpdateOrder = {
                productId: cartItem.productId,
                cartId: cartId,
                orderId: cartItem.id,
                count: cartItem.count + 1,
                createDate: moment()
            }
            try {
                await dispatch(updateOrder(order))
            } catch (error) {
                console.error('ERR: incremntQty()');
            }
        }
    }

    const decrementQty = async (cartItem: IFullOrder) => {
        if (!!cartId) {
            const order: IUpdateOrder = {
                productId: cartItem.productId,
                cartId: cartId,
                orderId: cartItem.id,
                count: cartItem.count - 1,
                createDate: moment()
            }
            try {
                if (cartItem.count - 1 == 0) {
                    await dispatch(deleteOrder({ orderId: cartItem.id, cartId }));
                    return;
                }
                await dispatch(updateOrder(order))
            } catch (error) {
                console.error('ERR: decrementQty()');
            }
        }
    }

    const onConfirmPay = async (details: PaymentDetailsForm) => {
        if (details.paymentType == 'bankCard') {
            onOpenDialog();
        }


        if (!!cartId) {
            try {
                const updateCartData: IUpdateCart = { ...details, cartId: cartId };
                const paymentData: ICreatePayment = { cartId: cartId, payment: true };
                console.log('updateCartData', updateCartData);
                console.log('paymentData', paymentData)
                await dispatch(updateCart(updateCartData));
                await dispatch(createPayment(paymentData));

                handleConfirmedDialog(true);
            } catch (error) {
                console.error('ERR: onConfirmPay');
            }
        }
    }



    useEffect(() => {

    }, [])

    return (
        <>
            {!!orders.length && <Box className={style.cartTitle}>Корзина</Box>}
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
            <JetDialog open={paymentDialog} onClose={onCloseDialog}>
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

            <JetDialog open={confirmedDialog} onClose={onCloseConfirmedDialog} fullwidth={true}>
                <DialogTitle sx={{textAlign:'center', paddingTop:'5%'}}>
                    <Typography component='span' className={style.thxTitle} color='primary'>Спасибо за покупку!</Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{textAlign:'center'}}>
                        <Box sx={{mb:2, fontWeight:'700', fontSize:'20px'}}>Номер вашего заказа:</Box>
                        <Box>{cartId}</Box>
                    </Box>
                </DialogContent>
            </JetDialog>
        </>
    )
}

export default JetCart;