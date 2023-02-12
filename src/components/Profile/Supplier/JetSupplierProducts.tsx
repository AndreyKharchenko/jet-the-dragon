import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, DialogActions, DialogContent, DialogTitle, Fab, IconButton, TextField, Typography } from '@mui/material'
import JetHrzProductCard from '../../ProductCards/ProductCard/JetHrzProductCard';
import style from './JetSupplier.module.css';
import JetDialog from '../../common/JetDialog';
import { Close, Add, CurrencyRuble } from '@mui/icons-material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Charak, IFullProduct } from '../../../models/product';
import JetSelect from '../../common/form-components/JetSelect';
import JetInput from '../../common/form-components/JetInput';
import { flexAround, flexBetweenCenter } from '../../../themes/commonStyles';
import JetAddProdCharak from '../../common/JetAddProdCharak';
import JetAddProdPhotos from '../../common/JetAddProdPhotos';

const JetSupplierProducts = () => {
  let tmpCards = [
    { id: 1, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false },
    { id: 2, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false },
  ];

  let [dialog, handleDialog] = useState<boolean>(false);
  let [charaks, setCharak] = useState<Charak[]>([]);
  let [photos, setPhoto] = useState([1,2,3,4,5,6,7,8,9]);
  const methods = useForm<IFullProduct>();

  const addCharak = () => {
    let newCharaks = [...charaks, { id: charaks.length + 1, charakName: '', charakValue: '' }];
    setCharak(newCharaks);
  }

  const addPhoto = () => {
    setPhoto([...photos,4]);
  }

  
  const onCloseDialog = () => {
    handleDialog(false);
  }

  const onSubmit: SubmitHandler<IFullProduct> = (data: IFullProduct) => {
    console.log('data:', data);
    console.log('Charak', charaks);
    let newCard = {
      id: tmpCards.length+1,
      image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80',
      name: data.productName,
      qty: data.productQty,
      price: data.productCost,
      isChoose: false,
      isFavourite: false
    };
    tmpCards = [newCard, ...tmpCards];
    onCloseDialog();
  }

  useEffect(() => {
    addCharak();
  },[])

  return (
    <>
      <Box>
        <Box className={style.title}>
          <Badge badgeContent={tmpCards.length} color="primary">
            Мои товары
          </Badge>
        </Box>
        <Box sx={{ ml: 4 }}>
          {
            tmpCards.map(it => {
              return (
                <JetHrzProductCard
                  key={it.id}
                  image={it.image}
                />
              )
            })
          }
        </Box>

        <JetDialog open={dialog} onClose={onCloseDialog} fullwidth={true}>
          <Box sx={{ p: 1 }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
              <Box sx={{ fontSize: '24px' }}>
                Создать новый заказа
              </Box>
              <IconButton sx={{ cursor: 'pointer' }} onClick={onCloseDialog}>
                <Close />
              </IconButton>
            </DialogTitle>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <DialogContent dividers={true}>
                  <Box>
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{mb:1}}>
                        <JetSelect
                          selectLabel='Укажите категорию товара'
                          selectName='productCategory'
                          options={[{ label: 'Мясо', value: 'meat' }, { label: 'Рыба', value: 'fish' }]}
                          sx={{ height:'2.2rem', mt: 1 }}
                        />
                      </Box>

                      <Box sx={{mb:4}}>
                        <JetInput
                          name='productName'
                          label='Укажите название продукта'
                          placeholder='Название продукта'
                          fullWidth={true}
                        />
                      </Box>

                      <Box sx={{mb:4}}>
                        <JetInput
                          name='productDesc'
                          label='Описание продукта'
                          placeholder='Описание продукта'
                          fullWidth={true}
                          multiline={true}
                          variant='filled'
                        />
                      </Box>

                      <Box sx={{...flexAround, mb:4}}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb:1 }}>
                          <CurrencyRuble color='secondary' fontSize='small' sx={{ mb: 1 }} />
                          <JetInput name='productCost' label='Цена за 1 кг' placeholder='Цена' />
                        </Box>
                        <Box>
                          <JetInput
                            name='productQty'
                            label='Укажите количесвто продукта'
                            placeholder='Укажите количесвто продукта'
                          />
                        </Box>
                        <Box>
                          <JetInput
                            name='productSl'
                            label='Укажите срок годности'
                            placeholder='Укажите срок годности'
                          />
                        </Box>
                      </Box>
                    </Box>

                    <JetAddProdCharak charaks={charaks} addCharak={addCharak} />

                    <Box sx={{fontSize: '20px', fontWeight: '600', mb:2}}>Добавьте фотографии товара</Box>
                    <JetAddProdPhotos photos={photos} addPhoto={addPhoto} />
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button type='submit' sx={{fontWeight:'500', fontSize:'0.875rem', textTransform:'uppercase'}}>
                    Сохранить
                  </Button>
                </DialogActions>
              </form>
            </FormProvider>
          </Box>
        </JetDialog>

        <Fab color="primary" sx={{ position: 'fixed', right: '100px', bottom: '100px' }} onClick={() => handleDialog(true)}>
          <Add />
        </Fab>
      </Box>
    </>
  )
}

export default JetSupplierProducts