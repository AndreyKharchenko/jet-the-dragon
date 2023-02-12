import React, { useState } from 'react'
import style from '../JetProductCard.module.css';
import { Avatar, Box, Card, CardContent, CardMedia, Checkbox, Chip, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { flexAround, flexBetween } from '../../../themes/commonStyles';

interface IHrzProductCard {
  key: number;
  image: string;
  onclick?: () => void
}

const JetHrzProductCard: React.FC<IHrzProductCard> = ({key, image, onclick}) => {
  return (
    <>
      <ListItem
        className={style.item}
        key={key}
        onClick={onclick}
      >
        <Box className={style.itemContainer}>
          <Box className={style.itemHeader}>
            Заказ № 554563
            <Chip label="Получено" color="primary" size="small" sx={{ ml: 1 }} />
          </Box>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ ...flexAround, mt: 2 }}>
            <ListItemAvatar className={style.itemAvatar}>
              <Avatar 
                src={image}
                sx={{width:'80px', height: '80px'}}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`Товар 1`}
              secondary={
                <React.Fragment>
                  <Box sx={{ mb: 0.2 }}>{`Дата оформления - 24.02.2023`}</Box>
                  <Box>{`Дата доставки - 27.02.2023`}</Box>
                </React.Fragment>
              }
            />
            <Box className={style.itemPrice}>1000 ₽</Box>
          </Box>
        </Box>
      </ListItem>
    </>
  )
}

export default JetHrzProductCard;