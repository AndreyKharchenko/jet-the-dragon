import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Fab, IconButton } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ICustomerLoginForm, ISupplierLoginForm } from '../../../models/login';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import JetInput from '../../common/form-components/JetInput';
import style from './JetSupplier.module.css';
import { dFlex, flexBetween, flexBetweenCenter } from '../../../themes/commonStyles';
import JetSelect from '../../common/form-components/JetSelect';
import JetDatePicker from '../../common/form-components/JetDatePicker';
import moment, { Moment } from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getSupplierData, updateCustomer, updateSupplier } from '../../../store/slices/userSlice';
import JetSpinner from '../../common/JetSpinner';
import { IUpdateCustomer, IUpdateSupplier } from '../../../models/user';
import * as userSelectors from '../../../store/selectors/userSelectors';
import * as authSelectors from '../../../store/selectors/authSelectors';

const CUSTOMER_FIELDS = ['firstName', 'lastName', 'phone', 'email', 'country', 'region', 'city', 'street', 'houseNumber'];



const JetSupplierMain = () => {
  const methods = useForm<ICustomerLoginForm>();
  const methods2 = useForm<ISupplierLoginForm>();
  let [disabled, setDisabled] = useState<boolean>(true);
  
  const getSupplierProfile = useAppSelector(userSelectors.supplierProfile);
  const getLoader = useAppSelector(userSelectors.loader);
  const getToken = useAppSelector(authSelectors.accessToken);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    // Собираем данные по Customer and Supplier
    let customerValues = methods.getValues();
    let supplierValues = methods2.getValues();
    
    // Предобработка данных
    delete supplierValues.customerId; 
    let supplierParams: IUpdateSupplier = {
      ...supplierValues, 
      supplierId: getSupplierProfile?.id || ''
    };
    let customerParams: IUpdateCustomer = {
      ...customerValues, 
      customerId: getSupplierProfile?.customerId || '', 
      flatNumber: getSupplierProfile?.flatNumber || ''
    };
    
    // Запросы на обновление
    try {
      await dispatch(updateCustomer(customerParams));
      await dispatch(updateSupplier({data: supplierParams, email: getSupplierProfile?.email || ''}));
    } catch (error) {
      console.error('ERR: UpdateSupplier');
    }
    setDisabled(true);
  }

  useEffect(() => {
    const getProfileData = async () => {
      if (!getSupplierProfile) {
        await dispatch(getSupplierData(getToken?.profile.name));
      }
    }

    getProfileData();

    for(let i in getSupplierProfile) {
      let name = i as any;
      let value = (getSupplierProfile as any)[i];
      if(name != 'id' || name != 'customerId') {
        if(CUSTOMER_FIELDS.indexOf(name) != -1) {
          methods.setValue(name, value || ''); 
        } else {
          methods2.setValue(name, value || ''); 
        }
        
      }
    }

  }, [])

  return (
    <>
      {getLoader && 
        <Box sx={{mt:10}}>
          <JetSpinner size={85} />
        </Box>
      }


      {!getLoader && 
      <Box sx={{ ml: '5%' }}>
        <Box sx={{ ml: 8 }}>
          <Avatar
            sx={{ width: '100px', height: '100px' }}
          >
            {getSupplierProfile?.firstName[0] + '' + getSupplierProfile?.lastName[0]}
          </Avatar>
          <IconButton color="primary" aria-label="upload picture" component="label" sx={{ position: 'relative', top: '-30px', left: '70px' }}>
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Box>

        <Box sx={{ ...flexBetweenCenter, mt: '-60px' }}>
          <FormProvider {...methods}>
            <form>
              <Box sx={{ width: '30vw' }}>
                <Box className={style.defaultInput}>
                  <JetInput name='firstName' label='Имя' placeholder='Имя' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='lastName' label='Фамилия' placeholder='Фамилия' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='phone' label='Телефон' placeholder='Телефон' required={false} mask='phone' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='email' label='E-mail' placeholder='E-mail' mask='email' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'country'} label={'Страна'} placeholder={'Страна'} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'region'} label={'Регион'} placeholder={'Регион'} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'city'} label={'Город'} placeholder={'Город'} disabled={disabled} />
                </Box>

                <Box sx={{...flexBetween, width:'20vw'}}>
                  <JetInput name={'street'} label={'Улица'} placeholder={'Улица'} disabled={disabled} />
                  <JetInput name={'houseNumber'} label={'Дом'} placeholder={'Дом'} disabled={disabled} sx={{width:'100px'}} />
                </Box>
              </Box>
            </form>
          </FormProvider>

          <FormProvider {...methods2}>
            <form>
              <Box sx={{}}>
                <Box className={style.defaultInput}>
                  <JetSelect
                    selectLabel='Форма организации'
                    selectName='orgType'
                    options={[{ label: 'ИП', value: 'ip' }, { label: 'ООО', value: 'ooo' }, { label: 'АО', value: 'ao' }, { label: 'ОАО', value: 'oao' }]}
                    disabled={disabled}
                    sx={{ width: '7rem' }}
                  />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'inn'} label={'ИНН'} placeholder={'ИНН'} inputProps={{ maxLength: 10 }} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'ogrnip'} label={'ОГРНИП'} placeholder={'ОГРНИП'} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'name'} label={'Наименование поставщика'} placeholder={'Наименование поставщика'} disabled={disabled} />
                </Box>

                <Box sx={{ ...flexBetweenCenter, mt: 3, mb: 3 }}>
                  <JetInput
                    name='declarationNum'
                    variant='outlined'
                    label='Номер декларация ТР ТС'
                    placeholder='Номер декларация ТР ТС'
                    inputProps={{ maxLength: 10 }}
                    disabled={disabled}
                    sx={{ width: '13rem' }}
                  />

                  <JetDatePicker
                    name='declarationDate'
                    label='Дата регистрации декларации ТР ТС'
                    format='DD.MM.YYYY'
                    initialValue={ moment(getSupplierProfile?.declarationDate) }
                    disabled={disabled}
                  />
                </Box>

                <Box sx={flexBetweenCenter}>
                  <JetInput
                    name='sanBookNum'
                    variant='outlined'
                    label='Номер санитарной книги'
                    placeholder='Номер санитарной книги'
                    inputProps={{ maxLength: 10 }}
                    disabled={disabled}
                    sx={{ width: '13rem' }}
                  />

                  <JetDatePicker
                    name='sanBookDate'
                    label='Дата получения санитраной книги'
                    format='DD.MM.YYYY'
                    initialValue={ moment(getSupplierProfile?.sanBookDate) }
                    disabled={disabled}
                  />
                </Box>
                
                <Box>
                  <JetInput
                    name='description'
                    label='Описание'
                    placeholder='Описание'
                    variant='filled'
                    multiline={true}
                    sx={{ width: '60%', mt: 3 }}
                    disabled={disabled}
                  />
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>

        <Button
          onClick={onSubmit}
          color='primary'
          variant='contained'
          sx={{ width: '250px', borderRadius: 5 }}
        >Сохранить
        </Button>
      </Box>
      }

      <Fab color="primary" sx={{ position: 'fixed', right: '100px', bottom: '60px' }} onClick={() => setDisabled(false)}>
        <EditIcon />
      </Fab>
    </>

  )
}

export default JetSupplierMain