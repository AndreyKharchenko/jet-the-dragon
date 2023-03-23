import React from 'react'
import { Box, Typography } from '@mui/material'
import style from './JetOrder.module.css';
import { flexAround, flexBetween } from '../../themes/commonStyles';
import {Place, Face6, Payment} from '@mui/icons-material';
import JetHrzProductCard from '../ProductCards/ProductCard/JetHrzProductCard';
import { useNavigate } from 'react-router-dom';
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
  return (
    <>
      <Box className={style.backToList} onClick={backToList}>
        Вернуться к списку заказов
      </Box>
      <Box>
        <Box className={style.orderTitle}>Заказ № {id}</Box>
        <Typography color='GrayText'>от 4 марта</Typography>
      </Box>
      <Box className={style.orderDetails}>
        <Box sx={{width: '30vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Place fontSize='small' color='primary' sx={{mb:-0.5}} /> Место получения
          </Box>
          <Box>Торговая палатка продавца, Россия, Краснодар, Кореновская улица, 13</Box>
        </Box>

        <Box sx={{width: '30vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Face6 fontSize='small' color='primary' sx={{mb:-0.5, mr: 0.5}}/>Получатель
          </Box>
          <Box>Андрей Харченко</Box>
        </Box>

        <Box sx={{width: '40vw'}}>
          <Box className={style.orderDetailsTitle}>
            <Payment fontSize='small' color='primary' sx={{mb:-0.5, mr: 0.5}} />Сумма
          </Box>

          <Box>
            <Box sx={flexBetween}>
              <Box>Товары</Box>
              <Box>294 ₽</Box>
            </Box>

            <Box sx={flexBetween}>
              <Box>Доставка</Box>
              <Box>Бесплатно</Box>
            </Box>

            <Box sx={flexBetween}>
              <Box>Итого</Box>
              <Box>294 ₽</Box>
            </Box>
          </Box>
        </Box>

      </Box>
      <Box sx={{mt: 2}}>
        {/*
          tmpCards.map(it => {
            return(
              <JetHrzProductCard 
                id={it.id} 
                image={it.image}
              />
            )
          })
        */}
      </Box>
    </>
  )
}

export default JetOrder