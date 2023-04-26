import React, { useEffect, useState } from 'react'
import style from './JetSupplier.module.css';
import { Badge, Box, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import * as userSelectors from '../../../store/selectors/userSelectors';
import { getSupplierActiveOrders } from '../../../store/slices/userSlice';
import JetOrderItem from '../../Orders/List/JetOrderItem';
const JetSupplierActiveOrders: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const supplierId = useAppSelector(userSelectors.supplierId);
  const supplierActiveOrders = useAppSelector(userSelectors.supplierActiveOrders);
  
  const handleOrderItemClick = (id: string) => {

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
                    <Box sx={{mb:3}}>
                      <Box className={style.orderNumTitle}>Заказ № {it.cartId}</Box>
                    </Box>
                  }

                  <JetOrderItem 
                    order={it} 
                    onclick={(id: string) => handleOrderItemClick(id)}
                  />
                  
                  {
                    (index != supplierActiveOrders.length - 1 && supplierActiveOrders[index].cartId != supplierActiveOrders[index+1].cartId)
                    &&
                    <Box sx={{mb:3, mt:5}}>
                      <Box className={style.orderNumTitle}>Заказ № {supplierActiveOrders[index+1].cartId}</Box>
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