import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Tabs, Tab, Paper, Slider, Tooltip, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { dFlex, flexAround, flexBetween, flexEnd } from '../../themes/commonStyles';
import {Star, IosShare, FavoriteBorder, InfoOutlined} from '@mui/icons-material';
import style from './JetProduct.module.css';
import Carousel from 'react-material-ui-carousel';
import JetTabPanel from '../common/JetTabPanel';
import * as authSelectors from '../../store/selectors/authSelectors';
import * as userSelectors from '../../store/selectors/userSelectors';
import * as cartSelectors from '../../store/selectors/cartSelectors';
import { IFullProduct } from '../../models/product';
import moment from 'moment';
import { getSupplierData } from '../../store/slices/userSlice';
import { createOrder } from '../../store/slices/cartSlice';
import { ICreateOrder } from '../../models/order';
import { deleteOrder } from '../../store/slices/cartSlice';
import { getImage } from '../../utils/utils';

interface IJetProduct {
  product: IFullProduct
}

type sliderSettingsType = {min: number, max: number, step: number, default: number};

const JetProduct: React.FC<IJetProduct> = ({product}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const supplierId = useAppSelector(userSelectors.supplierId);
  const supplierData = useAppSelector(userSelectors.supplierProfile);
  const getToken = useAppSelector(authSelectors.accessToken); 
  const cartId = useAppSelector(cartSelectors.cartId);
  const orders = useAppSelector(cartSelectors.orders);

  const [prodCount, setProdCount] = React.useState<number>(500);
  const [sliderSettings, setSliderSettings] = React.useState<sliderSettingsType>({min: 500, max: 10000, default: 500, step: 500});
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

  const onSupplier = (id: string) => {
    if(!!id) {
      navigate(`/supplier/${id}`);
    }
  }

  const valueLabelFormat = (value: number) => {
    const grmUnits = ['Гр', 'Кг'];
    const packUnits = ['Шт'];

    let unitIndex = 0;
    let scaledValue = value;

    if(product.unit == '1000GRM') {
      while (scaledValue >= 1000 && unitIndex < grmUnits.length - 1) {
        unitIndex += 1;
        scaledValue /= 1000;
      }
    
      return `${scaledValue} ${grmUnits[unitIndex]}`;
    } else {

      return `${scaledValue} ${packUnits[unitIndex]}`;
    }  
  }

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const getSupplierInfo = async () => {
    try {
      await dispatch(getSupplierData(getToken?.profile.name));
    } catch (error) {
      console.error('ERR: getSupplierData', error);
    }
  }

  const addToCart = async () => {
    setBuy(true);
    try {
      if(!!cartId) {
        console.log('PRODCO', prodCount)
        let count = prodCount;
        if(product.unit == '1000GRM') {
          console.log('111s')
          count = Math.round(prodCount/1000);
        }
        console.log('co', count)
        const order: ICreateOrder = {productId: product.id, cartId: cartId, count: count, createDate: moment() };
        await dispatch(createOrder(order));
      }
      
    } catch (error) {
      console.error('ERR: addToCart()');
    }
  }

  const removeOrder = async () => {
    setBuy(false);
    const order = orders.find(ord => ord.productId == product.id);
    if(!!order?.id && !!cartId) {
      try {
        await dispatch(deleteOrder({orderId: order.id, cartId}));
      } catch (error) {
        console.error('ERR: removeOrder()');
      }
    }
  }
  

  useEffect(() => {
    if(product.supplierId != supplierId) {
      getSupplierInfo();
    }
    
    if(product.unit == 'PACK') {
      setProdCount(1);
      setSliderSettings({min: 1, max: 100, default: 1, step: 1});
    } 
  }, [])

  return (
    <Box className={style.productContainer}>
      <Box className={style.productTitle}>
        <span className={style.productTitleTxt}>{product.name}</span>
      </Box>
      <Box className={style.productUtils}>
        <Box sx={flexBetween}>
          <Box sx={dFlex}>
            <Star className={style.productRaiting} />
            <Typography component="h5" sx={{ml:0.5, mt:0, mr:1}}>{product.rating}</Typography>
          </Box>
          <Box>
            { supplierData?.country + ", " + supplierData?.region + ", " + supplierData?.city }
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
            { !!product.productImages?.length && 
              product.productImages.map(it => {
                return(
                  <Paper>
                    <Box
                      component="img"
                      className={style.productImg}
                      src={getImage(it)}
                    />
                  </Paper>
                )
              })
            }

            { !product.productImages?.length &&
              <Paper>
                <Box
                  component="img"
                  className={style.productImg}
                  src={getImage('')}
                />
              </Paper>
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
                  <span>{product.price} </span>
                  <span className={style.productUnit}>за кг</span>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Star className={style.productRaiting} />
                    <Typography component="h5" sx={{mt:0.2, ml: 0.5}}>{product.rating}</Typography>
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
                  min={sliderSettings.min}
                  max={sliderSettings.max}
                  defaultValue={sliderSettings.default}
                  step={sliderSettings.step}
                  getAriaValueText={valueLabelFormat}
                  valueLabelFormat={valueLabelFormat}
                  onChange={handleCountChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{fontSize:'16px'}}>Дата изготовления - { moment(product.manufactureDate).format('DD.MM.YYYY') }</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{fontSize:'16px'}}>Дата доставки  - { moment(product.manufactureDate).add('days', 2).format('DD.MM.YYYY') }</Typography>
                <Typography variant="body2" color="secondary" sx={{fontSize:'14px'}}>Пункт выдачи - торговая точка производителя</Typography>
              </Box>

              {
                (isBuy) 
                ?
                <Button 
                  variant="contained" 
                  fullWidth={true} 
                  className={style.buyBtn}
                  onClick={removeOrder}
                  color="inherit"
                >
                  Убрать из корзины
                </Button>
                :
                <Button 
                  variant="contained" 
                  fullWidth={true} 
                  className={style.buyBtn}
                  onClick={addToCart}
                >
                  Купить
                </Button>
              }

              <Box sx={{mt: 2}}>
                <Typography sx={{fontSize:'16px', mr:1}} color="secondary" component='span'>
                  Продавец: 
                </Typography>
                <Typography component='span' color="primary" onClick={() => onSupplier(supplierId || '')} sx={{cursor:'pointer'}}>
                  {supplierData?.name} 
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
              {product.description}
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
                  <Box>{product.id}</Box>
              </ListItem>

              <ListItem sx={flexBetween}>
                  <Box className={style.nameSpec}>Срок годности (дни)</Box>
                  <Box className={style.space}></Box>
                  <Box>{product.shelfLife}</Box>
              </ListItem>

              {
                product.productCharaks.map(charak => {
                  return(
                    <ListItem sx={flexBetween}>
                        <Box className={style.nameSpec}>{charak.key}</Box>
                        <Box className={style.space}></Box>
                        <Box>{charak.value}</Box>
                    </ListItem>
                  )
                })
              }
            </List>
          </Box>
        </JetTabPanel>
        <JetTabPanel value={tab} index={2}>
          <Box className={style.tabContainer}>
            <Typography className={style.tabTitle}>О производителе</Typography>
            <Box>
              {supplierData?.description}
            </Box>
          </Box>
        </JetTabPanel>
      </Box>
    </Box>
  )
}

export default JetProduct