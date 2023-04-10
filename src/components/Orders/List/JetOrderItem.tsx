import React from 'react'
import { Avatar, Box, Chip, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import style from '../JetOrder.module.css'
import { flexAround } from '../../../themes/commonStyles';
import { ICustomerPaymentOrder } from '../../../models/order';
import moment from 'moment';
import { getImage } from '../../../utils/utils';

interface IJetOrderItem {
  order: ICustomerPaymentOrder;
  onclick: (id: string) => void 
}

const JetOrderItem: React.FC<IJetOrderItem> = ({order, onclick}) => {
  return (
    <>
      <ListItem
        className={style.item}
        key={order.id}
        onClick={ () => onclick(order.id)} 
        sx={{zIndex:-1}}
      >
        <Box className={style.itemContainer}>
          <Box className={style.itemHeader}>
            <Box className={style.itemHeaderTitle}>Заказ № {order.id}</Box>
            <Chip label="Оплачено" color="primary" size="small" sx={{ ml: 1 }} />
          </Box>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ ...flexAround, mt: 2 }}>
            <ListItemAvatar className={style.itemAvatar}>
              <Avatar
                sx={{ width: '80px', height: '80px' }}
                src={getImage(order.productImage)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Box sx={{fontSize:'20px', fontWeight:'600'}}>{order.productName}</Box>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Box sx={{ mb: 0.2 }}>{`Дата оформления - ${moment(order.createDate).format('DD.MM.YYYY')}`}</Box>
                  <Box>{`Дата доставки - ${moment(order.createDate).add(2,'days').format('DD.MM.YYYY')}`}</Box>
                </React.Fragment>
              }
            />
            <Box className={style.itemPrice}>{order.productPrice} ₽</Box>
          </Box>
        </Box>
      </ListItem>
    </>
  )
}

export default JetOrderItem