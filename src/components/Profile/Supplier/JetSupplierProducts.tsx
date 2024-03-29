import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import JetHrzProductCard from '../../ProductCards/ProductCard/JetHrzProductCard';
import style from './JetSupplier.module.css';
import JetDialog from '../../common/JetDialog';
import { Close, Add, CurrencyRuble } from '@mui/icons-material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Charak, CharakValue, ICreateProduct, IFullProduct, IUpdateProductRequest, newPhoto } from '../../../models/product';
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
import { getSupplierProducts, createProduct, updateProduct, deleteProduct } from '../../../store/slices/userSlice';
import moment from 'moment';
import { uuid } from '../../../utils/utils';

type selectOption = { label: string, value: string | number };

type dialogType = { title: 'Создать новый заказа' | 'Редактировать заказ', value: boolean };

type delDialogType = { title: string, value: boolean, productId: string };

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
  unit: '1000GRM',
  productCharaks: []
}

const JetSupplierProducts = () => {
  const supplierProducts = useAppSelector(userSelectors.supplierProducts);
  const productCategories = useAppSelector(catalogSelectors.productCategories);
  const getSupplierId = useAppSelector(userSelectors.supplierId);

  const dispatch = useAppDispatch();

  let [dialog, handleDialog] = useState<dialogType>({ title: 'Создать новый заказа', value: false });
  let [delDialog, handleDelDialog] = useState<delDialogType>({title: '', value: false, productId: ''});
  let [edit, setEdit] = useState<boolean>(false);
  let [charaks, setCharak] = useState<Charak[]>([]);

  let [newPhotos, setNewPhotos] = useState<newPhoto[]>([]); // добавленные фотографии
  let [photos, setPhotos] = useState<string[]>([]); // пришедшие фотографии
  let [delPhotos, setDelPhotos] = useState<string[]>([]); // удаленные пришедшие фотографии

  let [productCatOpts, setProductCatOpts] = useState<selectOption[] | []>([]);
  let [snackbar, setSnackbar] = useState<boolean>(false);
  let [currentProduct, setCurrentProduct] = useState<IFullProduct>(defaultFormVal);

  const methods = useForm<ICreateProduct>();

  // Операция с характеристиками
  const addCharak = () => {
    let charaksLen = charaks.length;

    if (charaksLen > 0 && !charaks[charaksLen - 1].key || !charaks[charaksLen - 1]?.value) {
      setSnackbar(true);
      return;
    }

    let newCharaks = [...charaks, { id: charaks.length + 1, key: '', value: '' }];
    setCharak(newCharaks);

  }

  // Операции с фотогорафиями
  const addNewPhoto = (e: any) => {
    if (e.target.files.length) {
      let obj = { id: uuid(), photo: e.target.files[0] };
      setNewPhotos([obj, ...newPhotos]);
    }
  }

  const deleteNewPhoto = (id: number) => {
    setNewPhotos([...newPhotos.filter(it => it.id != id)]);
  }

  const deletePhoto = (id: string) => {
    if (delPhotos.indexOf(id) == -1) {
      setPhotos([...photos.filter(it => it != id)]);
      setDelPhotos([...delPhotos, id]);
    }

  }

  // Показа окон (dialog, snackbar)
  const closeDialog = useCallback(() => handleDialog({ ...dialog, value: false }), [handleDialog]);
  const closeDelDialog = useCallback(() => handleDelDialog({...delDialog, value: false}), [handleDelDialog]);
  const onCloseSnackbar = () => { setSnackbar(false) }

  // Заполнение формы на редактирование
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
      unit: product.unit,
      productImages: [],
      productCharaks: []
    };

    let charaks: Charak[] = [];
    product.productCharaks.map((it, index) => {
      charaks.push({ id: index + 1, key: it.key, value: it.value });
    })

    setDelPhotos([]);
    setPhotos(product.productImages || []);
    setCharak(charaks);
    setCurrentProduct(form);
  }

  // Кпопка редактировать
  const onEdit = (id: string | number) => {
    setEdit(true);
    handleDialog({ title: 'Редактировать заказ', value: true })
    const index = supplierProducts.findIndex(it => it.id == id);
    onSetForm(supplierProducts[index]);
  }

  // Удаление продукта
  const onDeleteHandler = async (id: string) => {
    closeDelDialog();
    try {
      await dispatch(deleteProduct({ productId: id }));
    } catch (error) {
      console.error('ERR: onDelete()');
    }
  }

  const onDelete = (id: string, name: string) => {
    handleDelDialog({title: `Вы уверены, что хотите удалить товар: ${name} ?`, value: true, productId: id });
  }

  // Кнопка "Добавить продукт"
  const onCreateProduct = () => {
    setEdit(false);
    handleDialog({ title: 'Создать новый заказа', value: true });
    setCurrentProduct(defaultFormVal);
  }

  // Submit
  const onSubmit: SubmitHandler<ICreateProduct> = async (data: ICreateProduct) => {
    console.log('DATA', data);
    console.log('PHOTOS', newPhotos);
    console.log('CHARAKS', charaks);
    if (!!getSupplierId) {
      data.supplierId = getSupplierId;
    }

    if (charaks.length) {
      data.productCharaks = [];
      charaks.map(charak => {
        data.productCharaks.push({ key: charak.key, value: charak.value });
      })
    }

    if (!edit) {
      // Создание
      data.rating = 0;
      let product = {
        productData: data,
        addImages: newPhotos.map(it => it.photo),
        deleteImages: delPhotos,
      }
      await dispatch(createProduct(product));
    } else {
      console.log('UPD')
      // Обновление
      data.rating = currentProduct.rating;
      let product: IUpdateProductRequest = {
        productData: { ...data, productId: currentProduct.id },
        addImages: newPhotos.map(it => it.photo),
        deleteImages: delPhotos,
      }
      await dispatch(updateProduct(product));
    }

    setEdit(false);
    closeDialog();

  }

  useEffect(() => {
    // Получаем продукты
    const getProducts = async () => {
      await dispatch(getSupplierProducts());
    }

    if (!supplierProducts.length) {
      getProducts();
    }


    // Инициализируем inputs для характеристик
    if (!charaks.length) {
      let newCharaks = [...charaks, { id: charaks.length + 1, key: '', value: '' }];
      setCharak(newCharaks);
    }

    // Заполняем категории
    if (!!productCategories?.length) {
      let options: selectOption[] = [];
      productCategories.map(category => {
        options.push({ label: category.name, value: category.id });
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
                  onDelete={onDelete}
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
                        options={productCatOpts || []}
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
                        <JetInput
                          name='price'
                          label='Цена'
                          placeholder='Цена'
                          initialVal={currentProduct.price}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CurrencyRuble />
                              </InputAdornment>
                            )
                          }}
                        />
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
                          label='Срок годности (дни)'
                          placeholder='Срок годности'
                          initialVal={currentProduct.shelfLife}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ ...flexAround, mb: 4 }}>
                      <Box>
                        <JetDatePicker
                          name='manufactureDate'
                          label='Дата изготовления продукта'
                          format='DD.MM.YYYY'
                          initialValue={moment(currentProduct.manufactureDate)}
                        />
                      </Box>

                      <Box>
                        <JetSelect
                          selectLabel='Единица измерения'
                          selectName='unit'
                          options={[{ label: 'Граммы (1000г)', value: '1000GRM' }, { label: 'По штучно', value: 'PACK' }]}
                          sx={{ height: '2.2rem', mt: 1 }}
                          initValue={currentProduct.unit}
                        />
                      </Box>
                    </Box>


                  </Box>

                  <JetAddProdCharak charaks={charaks} addCharak={addCharak} />

                  <Box sx={{ fontSize: '20px', fontWeight: '600', mb: 2 }}>Добавьте фотографии товара</Box>
                  <JetAddProdPhotos
                    photos={photos}
                    newPhotos={newPhotos}
                    addNewPhoto={addNewPhoto}
                    delNewPhoto={deleteNewPhoto}
                    delPhoto={deletePhoto}
                  />
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

        <JetDialog open={delDialog.value} onClose={closeDelDialog} fullwidth={true}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
            <Box sx={{ fontSize: '24px' }}>
              Удалить товар
            </Box>
            <IconButton sx={{ cursor: 'pointer' }} onClick={closeDelDialog}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Box>{delDialog.title}</Box>
          </DialogContent>

          <DialogActions>
            <Button 
              className={style.submitBtn} 
              variant="contained" 
              onClick={() => onDeleteHandler(delDialog.productId)}
            >
              Удалить
            </Button>
          </DialogActions>
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