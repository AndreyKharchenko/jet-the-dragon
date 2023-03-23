import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, IconButton, TextField, Typography } from '@mui/material'
import JetHrzProductCard from '../../ProductCards/ProductCard/JetHrzProductCard';
import style from './JetSupplier.module.css';
import JetDialog from '../../common/JetDialog';
import { Close, Add, CurrencyRuble } from '@mui/icons-material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Charak, CharakValue, ICreateProduct, IFullProduct } from '../../../models/product';
import JetSelect from '../../common/form-components/JetSelect';
import JetInput from '../../common/form-components/JetInput';
import { flexAround, flexEnd } from '../../../themes/commonStyles';
import JetAddProdCharak from '../../common/JetAddProdCharak';
import JetAddProdPhotos from '../../common/JetAddProdPhotos';
import JetSnackbar from '../../common/JetSnackbar';
import JetDatePicker from '../../common/form-components/JetDatePicker';
import * as catalogSelectors from '../../../store/selectors/catalogSelectors';
import * as userSelectors from '../../../store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getSupplierProducts, createProduct, updateProduct } from '../../../store/slices/userSlice';
import moment from 'moment';



type selectOption = {label: string, value: string | number};

type dialogType = {title: 'Создать новый заказа' | 'Редактировать заказ', value: boolean}

const defaultFormVal: IFullProduct = {
  id: '',
  categoryId: '',
  supplierId: '',
  name: '',
  description: '',
  price: 0,
  count: 0,
  shelfLife: 0,
  manufactureDate: moment(),
  rating: 0,
  productCharaks: []
}

const JetSupplierProducts = () => {
  const supplierProducts = useAppSelector(userSelectors.supplierProducts);
  const productCategories = useAppSelector(catalogSelectors.productCategories);
  const getSupplierId = useAppSelector(userSelectors.supplierId);

  const dispatch = useAppDispatch();

  let [dialog, handleDialog] = useState<dialogType>({title:'Создать новый заказа', value: false});
  let [edit, setEdit] = useState<boolean>(false);
  let [charaks, setCharak] = useState<Charak[]>([]);
  let [photos, setPhoto] = useState<any>([]);
  let [productCatOpts, setProductCatOpts] = useState<selectOption[] | []>([]);
  let [snackbar, setSnackbar] = useState<boolean>(false);
  let [currentProduct, setCurrentProduct] = useState<IFullProduct>(defaultFormVal);

  const methods = useForm<ICreateProduct>();

  const addCharak = () => {
    let charaksLen = charaks.length;

    if (charaksLen > 0 && !charaks[charaksLen - 1].key || !charaks[charaksLen - 1]?.value) {
      setSnackbar(true);
      return;
    }

    let newCharaks = [...charaks, { id: charaks.length + 1, key: '', value: '' }];
    setCharak(newCharaks);

  }

  const addPhoto = (e: any) => {
    if (e.target.files.length) {
      setPhoto([...photos, e.target.files[0]]);
    }
  }

  const closeDialog = useCallback(() => handleDialog({...dialog, value: false}), [handleDialog]);
  const onCloseSnackbar = () => {setSnackbar(false)}

  const onSetForm = (product: IFullProduct) => {
    let form: IFullProduct = {
      id: product.id,
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      price: product.price,
      count: product.count,
      shelfLife: product.shelfLife,
      manufactureDate: product.manufactureDate,
      rating: product.rating,
      productCharaks: []
    };

    let charaks:Charak[] = [];
    product.productCharaks.map((it,index) => {
      charaks.push({id: index+1, key: it.key, value:it.value});
    })

    setCharak(charaks);
    setCurrentProduct(form);
  }

  const onEdit = (id: string | number) => {
    setEdit(true);
    handleDialog({title:'Редактировать заказ', value:true})
    const index = supplierProducts.findIndex(it => it.id == id);
    onSetForm(supplierProducts[index]);
  }

  const onCreateProduct = () => {
    handleDialog({title:'Создать новый заказа', value: true});
    setCurrentProduct(defaultFormVal);
  }
  

  const onSubmit: SubmitHandler<ICreateProduct> = async (data: ICreateProduct) => {
    console.log('DATA', data);
    console.log('PHOTOS', photos);
    console.log('CHARAKS', charaks);
    if(!!getSupplierId) {
      data.supplierId = getSupplierId;
    }

    if(charaks.length) {
      data.productCharaks = [];
      charaks.map(charak => {
        data.productCharaks.push({key: charak.key, value: charak.value});
      })
    }

    if(!edit) {
      // Создание
      data.rating = 0;
      await dispatch(createProduct({productData: data, images: photos}));
    } else {
      console.log('UPD')
      // Обновление
      data.rating = currentProduct.rating;
      await dispatch(updateProduct({productData: {...data, productId: currentProduct.id}, images: photos}));
    }

    setEdit(false);
    closeDialog();

  }

  useEffect(() => {
    // Получаем продукты
    const getProducts = async () => {
      await dispatch(getSupplierProducts());
    }

    if(!supplierProducts.length) {
      console.log('1100')
      getProducts();
    }
    
    
    // Инициализируем inputs для характеристик
    if (!charaks.length) {
      let newCharaks = [...charaks, { id: charaks.length + 1, key: '', value: '' }];
      setCharak(newCharaks);
    }

    // Заполняем категории
    if(!!productCategories?.length) {
      let options : selectOption[] = [];
      productCategories.map(category => {
        options.push({label: category.name, value: category.id});
      })

      setProductCatOpts(options);
    }
  }, [])

 


  return (
    <>
      <Box>
        <Box className={style.title}>
          <Badge badgeContent={supplierProducts.length.toString()} color="primary">
            Мои товары
          </Badge>
        </Box>
        <Box sx={{ ml: 4 }}>
          {!!supplierProducts &&
            supplierProducts.map(it => {
              return (
                <JetHrzProductCard
                  data={it}
                  edit={true}
                  onEdit={onEdit}
                />
              )
            })
          }
        </Box>

        <JetDialog open={dialog.value} onClose={closeDialog} fullwidth={true}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
            <Box sx={{ fontSize: '24px' }}>
              {dialog.title}
            </Box>
            <IconButton sx={{ cursor: 'pointer' }} onClick={closeDialog}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers={true}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box>
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ mb: 1 }}>
                      <JetSelect
                        selectLabel='Укажите категорию товара'
                        selectName='categoryId'
                        options={ productCatOpts || [] }
                        sx={{ height: '2.2rem', mt: 1 }}
                        initValue={currentProduct.categoryId}
                      />
                  </Box>

                    <Box sx={{ mb: 4 }}>
                      <JetInput
                        name='name'
                        label='Укажите название продукта'
                        placeholder='Название продукта'
                        fullWidth={true}
                        initialVal={currentProduct.name}
                      />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <JetInput
                        name='description'
                        label='Описание продукта'
                        placeholder='Описание продукта'
                        fullWidth={true}
                        multiline={true}
                        variant='filled'
                        initialVal={currentProduct.description}
                      />
                    </Box>

                    <Box sx={{ ...flexAround, mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', mr: 1 }}>
                        <CurrencyRuble color='secondary' fontSize='small' sx={{ mb: 1 }} />
                        <JetInput name='price' label='Цена за 1 кг' placeholder='Цена' initialVal={currentProduct.price} />
                      </Box>
                      <Box sx={{ mr: 1 }}>
                        <JetInput
                          name='count'
                          label='Количесвто продукта'
                          placeholder='Количесвто продукта'
                          initialVal={currentProduct.count}
                        />
                      </Box>
                      <Box>
                        <JetInput
                          name='shelfLife'
                          label='Срок годности'
                          placeholder='Срок годности'
                          initialVal={currentProduct.shelfLife}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <JetDatePicker
                        name='manufactureDate'
                        label='Дата изготовления продукта'
                        format='DD.MM.YYYY'
                        initialValue={ moment(currentProduct.manufactureDate) }
                      />
                    </Box>


                  </Box>

                  <JetAddProdCharak charaks={charaks} addCharak={addCharak} />

                  <Box sx={{ fontSize: '20px', fontWeight: '600', mb: 2 }}>Добавьте фотографии товара</Box>
                  <JetAddProdPhotos photos={photos} addPhoto={addPhoto} />
                </Box>

                <Divider />

                <Box sx={{ ...flexEnd, mt: 3 }}>
                  <Button type='submit' className={style.submitBtn}>
                    Сохранить
                  </Button>
                </Box>

                <JetSnackbar
                  open={snackbar}
                  onClose={onCloseSnackbar}
                  severity='error'
                  msg='Не все характеристики заполнены'
                />
              </form>
            </FormProvider>
          </DialogContent>
        </JetDialog>
        

        <Fab 
          color="primary" 
          sx={{ position: 'fixed', right: '100px', bottom: '100px' }} 
          onClick={onCreateProduct}
        >
          <Add />
        </Fab>
      </Box>
    </>
  )
}

export default JetSupplierProducts