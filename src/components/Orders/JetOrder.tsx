import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import style from './JetOrder.module.css';
import { flexAround, flexBetween } from '../../themes/commonStyles';
import {Place, Face6, Payment} from '@mui/icons-material';
import * as userSelectors from '../../store/selectors/userSelectors'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { ICustomerPaymentOrder } from '../../models/order';
import moment from 'moment';
import { getDeliveryType, getPaymentType } from '../../utils/utils';
interface IJetOrder {
  id: number | string
}
const tmpCards = [
  {id: 1, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
  {id: 2, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false,  isFavourite: false},
];
const JetOrder: React.FC<IJetOrder> = ({id}) => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  }

  const custPaymentOrders = useAppSelector(userSelectors.custPaymentOrders);
  const custPaymentFirstName = useAppSelector(userSelectors.customerFirstName);
  const custPaymentLastName = useAppSelector(userSelectors.customerLastName);
  const [order, setOrder] = useState<ICustomerPaymentOrder>();

  useEffect(() => {
    let order = custPaymentOrders.filter(it => it.id == id)[0];
    setOrder(order);
  },[])
  return (
    <>
      <Box className={style.backToList} onClick={backToList}>
        Вернуться к списку заказов
      </Box>
      <Box>
        <Box className={style.orderTitle}>Заказ № {id}</Box>
        <Typography color='GrayText'>от {moment(order?.createDate).format('DD.MM.YYYY')}</Typography>
      </Box>
      <Box className={style.orderDetails}>
        <Box sx={{width: '30vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Place fontSize='small' color='primary' sx={{mb:-0.5}} /> Место получения
          </Box>
          <Box>{order?.supplierAddres}</Box>
        </Box>

        <Box sx={{width: '30vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Face6 fontSize='small' color='primary' sx={{mb:-0.5, mr: 0.5}}/>Получатель
          </Box>
          <Box>{custPaymentFirstName + ' ' + custPaymentLastName}</Box>
        </Box>

        <Box sx={{width: '40vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Payment fontSize='small' color='primary' sx={{mb:-0.5, mr: 0.5}} />Сумма
          </Box>

          <Box>
            <Box sx={flexBetween}>
              <Box>Сумма заказа</Box>
              <Box>{order?.productPrice} ₽</Box>
            </Box>

            <Box sx={flexBetween}>
              <Box>Способ получения</Box>
              <Box>{getDeliveryType(order?.cartDeliveryType)}</Box>
            </Box>

            <Box sx={flexBetween}>
              <Box>Тип оплаты</Box>
              <Box>{getPaymentType(order?.cartPaymentType)}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default JetOrder