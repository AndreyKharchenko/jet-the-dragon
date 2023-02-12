import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Fab, IconButton } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ISupplierLoginForm } from '../../../models/login';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import JetInput from '../../common/form-components/JetInput';
import style from './JetSupplier.module.css';
import { dFlex, flexBetweenCenter } from '../../../themes/commonStyles';
import JetSelect from '../../common/form-components/JetSelect';
import JetDatePicker from '../../common/form-components/JetDatePicker';
import moment, {Moment} from 'moment';

const JetSupplierMain = () => {
  const methods = useForm<ISupplierLoginForm>();
  let [disabled, setDisabled] = useState<boolean>(true);
  const onSubmit: SubmitHandler<ISupplierLoginForm> = (data: ISupplierLoginForm) => {
    console.log('data:', data);
    setDisabled(true);
  }

  useEffect(() => {
    methods.setValue('firstname', 'Андрей');
    methods.setValue('lastname', 'Харченко');
    methods.setValue('patronymic', 'Олегович');
    methods.setValue('phone', '+79184561288');
    methods.setValue('email', '111@mail.ru');
    methods.setValue('city', 'Краснодар');
    methods.setValue('street', 'Кореновская');
    methods.setValue('housenumber', '34');
    methods.setValue('inn', '11111111111');
    methods.setValue('supplierName', 'ООО "Такси"');
    methods.setValue('chiefName', 'Харченко А.О.');
    methods.setValue('ogrnip', '11111111111');
    methods.setValue('declarationNum', '38');
    methods.setValue('sanBookNum', '99');
    
  }, [])

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ml:'5%'}}>
            <Box sx={{ ml: 8 }}>
              <Avatar
                sx={{ width: '100px', height: '100px' }}
              >
                OP
              </Avatar>
              <IconButton color="primary" aria-label="upload picture" component="label" sx={{ position: 'relative', top: '-30px', left: '70px' }}>
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>

            <Box sx={{...flexBetweenCenter, mt:'-80px'}}>
              <Box sx={{ width: '30vw' }}>
                <Box className={style.defaultInput}>
                  <JetInput name='firstname' label='Имя' placeholder='Имя' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='lastname' label='Фамилия' placeholder='Фамилия' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='patronymic' label='Отчество' placeholder='Отчество' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='phone' label='Телефон' placeholder='Телефон' required={false} mask='phone' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='email' label='E-mail' placeholder='E-mail' mask='email' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='supplierName' label='Наименование поставщика' placeholder='Наименование поставщика' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='chiefName' label='ФИО руководителя' placeholder='ФИО руководителя' disabled={disabled} />
                </Box>

              </Box>

              <Box sx={{ mt:'80px' }}>
                <Box sx={{...flexBetweenCenter, mb:1}}>
                  <JetSelect
                    selectLabel='Страна'
                    selectName='country'
                    initValue='us'
                    options={[{ label: 'Россия', value: 'rus' }, { label: 'США', value: 'us' }]}
                    disabled={disabled}
                    sx={{ width: '7rem' }}
                  />

                  <JetSelect
                    selectLabel='Регион'
                    selectName='region'
                    initValue='25'
                    options={[{ label: 'Краснодарский край', value: '23' }, { label: 'Приморский край', value: '25' }]}
                    disabled={disabled}
                    sx={{ width: '12rem' }}
                  />
                </Box>

                <Box sx={{mb:5, ...flexBetweenCenter}}>
                  <JetInput name={'city'} label={'Город'} placeholder={'Город'} disabled={disabled} />
                  <JetInput name={'street'} label={'Улица'} placeholder={'Улица'} disabled={disabled} />
                  <JetInput name={'housenumber'} label={'Дом'} placeholder={'Дом'} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetSelect
                    selectLabel='Форма организации'
                    selectName='orgFormat'
                    options={[{ label: 'ИП', value: 'ip' }]}
                    disabled={disabled}
                    sx={{ width: '7rem' }}  
                  />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'inn'} label={'ИНН'} placeholder={'ИНН'} disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name={'ogrnip'} label={'ОГРНИП'} placeholder={'ОГРНИП'} disabled={disabled} />
                </Box>

                <Box sx={{...flexBetweenCenter, mt:3, mb:3}}>
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
                    name='dtDeclaration'
                    label='Дата регистрации декларации ТР ТС'
                    format='DD.MM.YYYY'
                    initialValue={moment().add(1,'month')}
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
                    name='sanBookDt'
                    label='Дата получения санитраной книги'
                    format='DD.MM.YYYY'
                    initialValue={moment().add(3,'month')}
                    disabled={disabled}
                  />

                </Box>
              </Box>
            </Box>

            <Button
              type='submit'
              color='primary'
              variant='contained'
              sx={{ margin: '1rem 0', width: '250px', borderRadius: 5 }}
            >Сохранить
            </Button>
          </Box>

          <Fab color="primary" sx={{ position:'fixed', right: '100px', bottom: '60px' }} onClick={() => setDisabled(false)}>
            <EditIcon />
          </Fab>

        </form>
      </FormProvider>
      
    </Box>

  )
}

export default JetSupplierMain