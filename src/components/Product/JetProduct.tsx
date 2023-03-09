import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Tabs, Tab, Paper, Slider, Tooltip, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { catalogActions } from '../../store/slices/catalogSlice';
import { dFlex, flexAround, flexBetween, flexEnd } from '../../themes/commonStyles';
import {Star, IosShare, FavoriteBorder, InfoOutlined} from '@mui/icons-material';
import style from './JetProduct.module.css';
import Carousel from 'react-material-ui-carousel';
import JetTabPanel from '../common/JetTabPanel';
import * as catalogSelectors from '../../store/selectors/catalogSelectors';

const JetProduct = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const productInfo = useAppSelector(catalogSelectors.currentProduct);
  const navigate = useNavigate();

  const [prodCount, setProdCount] = React.useState<number>(0);
  const [isBuy, setBuy] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);

  const handleCountChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setProdCount(newValue);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onSupplier = (id: number) => {
    navigate(`/supplier/${id}`);
  }

  const valueLabelFormat = (value: number) => {
    const units = ['Гр', 'Кг'];
    console.log('value', value);
  
    let unitIndex = 0;
    let scaledValue = value;
  
    while (scaledValue >= 1000 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1000;
    }
  
    return `${scaledValue} ${units[unitIndex]}`;
  }

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }
  

  useEffect(() => {
    dispatch(catalogActions.setCurrentProduct( {id: Number(params.id)} ));
  }, [])

  const sliderData = [
    {id:1, img: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8='},
    {id:2, img: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80'},
    {id:3, img: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc='},
  ]
  
  return (
    <Box className={style.productContainer}>
      <Box className={style.productTitle}>
        <span className={style.productTitleTxt}>{productInfo?.name}</span>
      </Box>
      <Box className={style.productUtils}>
        <Box sx={flexBetween}>
          <Box sx={dFlex}>
            <Star className={style.productRaiting} />
            <Typography component="h5" sx={{mt:0.2, ml: 0.5}}>5.0</Typography>
          </Box>
          <Box className={style.productFeedBack}>
            169 отзывов
          </Box>
          <Box>
            Россия, Краснодарский край, г. Краснодар
          </Box>
        </Box>
        <Box sx={flexBetween}>
          <Button className={style.productUtlBtn}>
            <IosShare />
            <span>Поделиться</span>
          </Button>
          <Button className={style.productUtlBtn}>
            <FavoriteBorder />
            <span>Сохранить</span>
          </Button>
        </Box>
      </Box>
      <Box sx={{...flexAround, mt: 5}}>
        <Box className={style.imageContainer}>
          <Carousel
          indicators={false}
          >
            {
              sliderData.map(it => {
                return(
                  <Paper>
                    <Box
                      component="img"
                      className={style.productImg}
                      src={it.img}
                    />
                  </Paper>
                )
              })
            }
          </Carousel>
        </Box>
        <Box className={style.productDetails}>
            <Card
              className={style.productCostCard}
              elevation={5}
            >
              <Box sx={flexBetween}>
                <Box className={style.productCost}> 
                  <span>345 ₽ </span>
                  <span className={style.productUnit}>за кг</span>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Star className={style.productRaiting} />
                    <Typography component="h5" sx={{mt:0.2, ml: 0.5}}>5.0</Typography>
                  </Box>
                  <Box className={style.productFeedBack}>
                    169 отзывов
                  </Box>
                </Box>
              </Box>

              <Box sx={{mt: 2, mb: 2}}>
                <Box>Укажите количество продукта: {valueLabelFormat(prodCount)}</Box>
                <Slider
                  value={prodCount}
                  min={100}
                  max={10000}
                  defaultValue={100}
                  step={50}
                  getAriaValueText={valueLabelFormat}
                  valueLabelFormat={valueLabelFormat}
                  onChange={handleCountChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{fontSize:'16px'}}>Доставка - 0 ₽</Typography>
                <Typography variant="body2" color="secondary" sx={{fontSize:'14px'}}>Дата доставки</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{fontSize:'16px'}}>Пункты выдачи  - 0 ₽</Typography>
                <Typography variant="body2" color="secondary" sx={{fontSize:'14px'}}>Дата доставки</Typography>
              </Box>

              {
                (isBuy) 
                ?
                <Button 
                  variant="contained" 
                  fullWidth={true} 
                  className={style.buyBtn}
                  onClick={() => setBuy(false)}
                  color="inherit"
                >
                  Убрать из корзины
                </Button>
                :
                <Button 
                  variant="contained" 
                  fullWidth={true} 
                  className={style.buyBtn}
                  onClick={() => setBuy(true)}
                >
                  Купить
                </Button>
              }

              <Box sx={{mt: 2}}>
                <Typography sx={{fontSize:'16px'}} color="secondary" component='span'>
                  Продавец: 
                </Typography>
                <Typography component='span' color="primary" onClick={() => onSupplier(1)} sx={{cursor:'pointer'}}>
                  Роджерс 
                  <Tooltip title="Информация о фирме" placement="top">
                    <InfoOutlined color='secondary' fontSize='small' sx={{cursor:'pointer'}} />
                  </Tooltip>
                </Typography>
              </Box>
            </Card>
        </Box>
      </Box>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="О товаре" {...a11yProps(0)} className={style.tab} />
            <Tab label="Характеристики" {...a11yProps(1)} className={style.tab} />
            <Tab label="О производителе" {...a11yProps(2)} className={style.tab} />
          </Tabs>
        </Box>
        <JetTabPanel value={tab} index={0}>
          <Box className={style.tabContainer}>
            <Typography className={style.tabTitle}>О Товаре</Typography>
            <Box>
              Здесь информация о товаре
            </Box>
          </Box>
        </JetTabPanel>
        <JetTabPanel value={tab} index={1}>
          <Box className={style.tabContainer}>
            <Typography className={style.tabTitle}>Характеристики</Typography>
            <List>
              <ListItem sx={flexBetween}>
                  <Box className={style.nameSpec}>Код товара</Box>
                  <Box className={style.space}></Box>
                  <Box>100043551842</Box>
              </ListItem>
            </List>
          </Box>
        </JetTabPanel>
        <JetTabPanel value={tab} index={2}>
          <Box className={style.tabContainer}>
            <Typography className={style.tabTitle}>О производителе</Typography>
            <Box>
              Здесь информация о производителе
            </Box>
          </Box>
        </JetTabPanel>
      </Box>
    </Box>
  )
}

export default JetProduct