import React, { useEffect, useState } from 'react'
import style from './JetSupplier.module.css';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import * as userSelectors from '../../../store/selectors/userSelectors';
import * as cartSelectors from '../../../store/selectors/cartSelectors';
import { getSupplierActiveOrders } from '../../../store/slices/userSlice';
import JetOrderItem from '../../Orders/List/JetOrderItem';
import { flexBetween } from '../../../themes/commonStyles';
import { createDelivered } from '../../../store/slices/cartSlice';
import JetSpinner from '../../common/JetSpinner';

const JetSupplierActiveOrders: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const supplierId = useAppSelector(userSelectors.supplierId);
  const supplierActiveOrders = useAppSelector(userSelectors.supplierActiveOrders);
  const cartLoader = useAppSelector(cartSelectors.loader);
  const handleOrderItemClick = (id: string) => {

  }

  const onCreateDelivered = async (id: string) => {
    try {
      await dispatch(createDelivered({cartId: id, delivered: true}));
      await dispatch(getSupplierActiveOrders({supplierId}));
    } catch (error) {
      console.error('ERR: onCreateDelivered()');
    }
  }

  const getActiveOrders = async () => {
    try {
      await dispatch(getSupplierActiveOrders({supplierId}));
    } catch (error) {
      console.error('ERR: getActiveOrders()');
    }
  }

  useEffect(() => {
    getActiveOrders();
  },[])
  
  return (
    <>
      <Box className={style.title}>
        Активные заказы
      </Box>
      <Box sx={{ ml: 4 }}>
        {
            supplierActiveOrders.map((it, index) => {
              return(
                <React.Fragment>
                  {
                    (index == 0)
                    &&
                    <Box sx={{mb:3, ...flexBetween}}>
                      <Box className={style.orderNumTitle}>Заказ № {it.cartId}</Box>
                      <Button 
                        variant='outlined' 
                        color='error'
                        onClick={() => onCreateDelivered(it.cartId)}
                      >
                        {
                          (cartLoader) 
                          ?
                          <JetSpinner size={20} color='error' />
                          :
                          "Закрыть заказ"
                        }
                      </Button>
                    </Box>
                  }

                  <JetOrderItem 
                    order={it} 
                    onclick={(id: string) => handleOrderItemClick(id)}
                  />
                  
                  {
                    (index != supplierActiveOrders.length - 1 && supplierActiveOrders[index].cartId != supplierActiveOrders[index+1].cartId)
                    &&
                    <Box sx={{mb:3, mt:5, ...flexBetween}}>
                      <Box className={style.orderNumTitle}>Заказ № {supplierActiveOrders[index+1].cartId}</Box>
                      <Button 
                        variant='outlined' 
                        color='error'
                        onClick={() => onCreateDelivered(supplierActiveOrders[index+1].cartId)}
                      >
                        {
                          (cartLoader) 
                          ?
                          <JetSpinner size={20} color='error' />
                          :
                          "Закрыть заказ"
                        }
                      </Button>
                    </Box>
                  }
                </React.Fragment>
              )
            })
          }
      </Box>
    </>
  )
}

export default JetSupplierActiveOrders