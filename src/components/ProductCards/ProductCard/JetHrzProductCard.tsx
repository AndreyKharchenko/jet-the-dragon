import React, { useState } from 'react'
import style from '../JetProductCard.module.css';
import { Avatar, Box, Typography, Checkbox, Chip, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {Edit, Star, DeleteOutline} from '@mui/icons-material';
import { flexAround, flexBetween, flexBetweenCenter } from '../../../themes/commonStyles';
import { IFullProduct } from '../../../models/product';
import moment from 'moment';
import { getImage } from '../../../utils/utils';

interface IHrzProductCard {
  data: IFullProduct;
  type?: 'PRODUCT' | 'ORDER',
  edit?: boolean,
  onEdit?: (id: string | number) => void,
  onclick?: () => void,
  onDelete?: (id: string, name: string) => void
}

const JetHrzProductCard: React.FC<IHrzProductCard> = ({data, type, edit, onclick, onEdit, onDelete}) => {
  return (
    <>
      <ListItem
        className={style.item}
        key={data.id}
        onClick={onclick}
      >
        <Box className={style.itemContainer}>
          {type == 'ORDER' && 
            <Box className={style.itemHeader}>
              Заказ № <span className={style.productCode}>{data.id}</span>
              <Chip label="Получено" color="primary" size="small" sx={{ ml: 1 }} />
            </Box>
          }

          {( type == 'PRODUCT' || !(!!type) ) && 
            <Box sx={{...flexBetween, width:'100%'}} className={style.itemHeader}>
              <Box sx={flexBetween}>
                <Box>Товар № <span className={style.productCode}>{data.id}</span></Box>
                <Box sx={{ml: 2, ...flexBetween}}>
                    <Star className={style.productRaiting} />
                    <Typography component="div" sx={{ml:0.5, mt:0.2}}>{data.rating}</Typography>
                </Box>
              </Box>
              {(edit && onEdit && onDelete) && 
                <Box sx={flexBetweenCenter}>
                  <Box>
                    <IconButton onClick={() => onEdit(data.id)} color='primary'>
                      <Edit />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton onClick={() => onDelete(data.id, data.name)} color='primary'>
                      <DeleteOutline color='error' />
                    </IconButton>
                  </Box>
                </Box>
              }
            </Box>
          }
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ ...flexAround, mt: 2 }}>
            <ListItemAvatar className={style.itemAvatar}>
              <Avatar 
                src={getImage(data.productImages?.length ? data.productImages[data.productImages?.length - 1] : '')}
                sx={{width:'80px', height: '80px'}}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Box className={style.itemName}>{data.name}</Box>
                  <Box>{data.description}</Box>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Box sx={{ mb: 0.2 }}>{`Срок годности (дни) - ${data.shelfLife}`}</Box>
                  <Box>{`Дата изготовления - ${moment(data.manufactureDate).format('DD.MM.YYYY')}`}</Box>
                </React.Fragment>
              }
            />
            <Box className={style.itemPrice}>{data.price} ₽</Box>
          </Box>
        </Box>
      </ListItem>
    </>
  )
}

export default JetHrzProductCard;