import React, { useEffect, useState } from 'react'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Paper, Step, StepButton, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form';
import JetInput from '../common/form-components/JetInput';
import JetSelect from '../common/form-components/JetSelect';
import JetDatePicker from '../common/form-components/JetDatePicker';
import style from './JetLogin.module.css';
import { flexBetweenCenter, dFlexCol, flexBetween, flexAround, flexCenter } from '../../themes/commonStyles';
import { ICustomerLoginForm, ISupplierLoginForm } from '../../models/login';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { updateCustomer, createCustomer, createSupplier, userActions } from '../../store/slices/userSlice';
import { IUpdateCustomer } from '../../models/user';
import JetSpinner from '../common/JetSpinner';
import * as userSelectors from '../../store/selectors/userSelectors';

const steps = ['Информация о физическом лице', 'Сведения об ИП', 'Декларация соответствия ТР ТС', 'Сведения о санитарной книге', 'Почти готово!'];

const JetSupplierLogin: React.FC<{}> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const getCustomerProfile = useAppSelector(userSelectors.customerProfile);
  const getLoader = useAppSelector(userSelectors.loader);
  const navigate = useNavigate();

  const methods = useForm<ICustomerLoginForm>();
  const methods2 = useForm<ISupplierLoginForm>();

  const handleStep = async (step: number) => {
    console.log('step', step);
    if (!await methods.trigger()) {
      return;
    }
    setActiveStep(step);
  };

  const handleNextStep = async () => {
    if (!await methods.trigger()) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompleteRegCustomer = async () => {
    // REQUEST CUSTOMER
    let values = methods.getValues();
    try {
      if(!!getCustomerProfile) {
        let params: IUpdateCustomer = {
          ...values,
          customerId: getCustomerProfile.id,
          flatNumber: getCustomerProfile.flatNumber
        }
  
        const res = await dispatch(updateCustomer(params));
      } else {
        let params: ICustomerLoginForm = {
          ...values,
          flatNumber: ''
        }
        const res = await dispatch(createCustomer(params));
      }
    } catch (error) {
      console.error('ERR: Create/Update Customer', error)
    }
    

    handleNextStep();
    
  };

  const handleCompleteReg = async () => {
    // REQUEST SUPPLIER
    let values = methods2.getValues();
    
    try {
      if(!!getCustomerProfile) {
        let params: ISupplierLoginForm = {
          ...values,
          customerId: getCustomerProfile.id,
        }
        const res = await dispatch(createSupplier(params));
        console.log('RESULT', res);
        dispatch(userActions.changeRole({role: 'supplier'}));
        navigate(`/my/main`);
      }
    } catch (error) {
      console.error('ERR: createSupplier', error)
    }
    
  };

  useEffect(() => {
    if (!!getCustomerProfile) {
      setDisabled(true);
    }
    for (let i in getCustomerProfile) {
      let name = i as any;
      let value = (getCustomerProfile as any)[i];
      if (name != 'id') {
        console.log('name', name)
        methods.setValue(name, value || '');
      }
    }
  }, [])

  return (
    <Grid>
      <Paper elevation={10} sx={{ padding: 20, height: '55vh', width: '55vw', margin: '20px auto' }}>
        <Grid container item alignItems='center' flexDirection='column' sx={{ position: 'absolute', top: '80px', left: '0px' }}>
          <Avatar sx={{ backgroundColor: '#3853D8' }}><LockOutlined /></Avatar>
          <Box sx={{ textTransform: 'uppercase' }}>
            <h2>Регистрация поставщика</h2>
          </Box>
        </Grid>

        <Grid container item alignItems='center' flexDirection='row' sx={{ justifyContent: 'center', mt: 3, cursor: 'pointer' }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {
              steps.map((step, index) => (
                <Step key={step}>
                  <StepLabel color='#3853D8' onClick={() => handleStep(index)}>
                    {step}
                  </StepLabel>
                </Step>
              ))
            }
          </Stepper>
        </Grid>

        <Grid container item alignItems='center' sx={{ mt: 4 }}>
          <Box sx={{width: (activeStep > 3) ? '100%' : 'auto'}}>
            {
              (activeStep == 0)
                ?
                <FormProvider {...methods}>
                  <form>
                    <Box>
                      <Box className={style.providerInfoContainer}>
                        <Box>
                          <Typography className={style.providerInfoSubtitleTxt}>Укажите ФИО</Typography>
                        </Box>
                        <Box sx={{ ...flexBetweenCenter, width: '50%' }}>
                          <JetInput
                            name={'lastName'}
                            label={'Фамилия'}
                            placeholder={'Фамилия'}
                            sx={{ mr: 2 }}
                          />
                          <JetInput
                            name={'firstName'}
                            label={'Имя'}
                            placeholder={'Имя'}
                          />
                        </Box>
                      </Box>

                      <Box className={style.providerInfoContainer}>
                        <Box className={style.providerInfoSubtitle}>
                          <Typography className={style.providerInfoSubtitleTxt}>Укажите телефон и E-mail</Typography>
                        </Box>
                        <Box sx={{ ...flexBetweenCenter, width: '57%' }}>
                          <JetInput
                            name={'phone'}
                            label={'Телефон'}
                            placeholder={'Телефон'}
                            mask='phone'
                          />

                          <JetInput
                            name={'email'}
                            label={'E-mail'}
                            placeholder={'E-mail'}
                            mask='email'
                            sx={{ width: '15rem' }}
                            disabled={disabled}
                          />
                        </Box>
                      </Box>

                      <Box>
                        <Box className={style.providerInfoSubtitle}>
                          <Typography className={style.providerInfoSubtitleTxt}>Адрес</Typography>
                        </Box>
                        <Box sx={{ ...flexBetweenCenter }}>
                          <JetInput
                            name={'country'}
                            label={'Страна'}
                            placeholder={'Страна'} sx={{ mr: 2 }}

                          />

                          <JetInput name={'region'} label={'Регион'} placeholder={'Регион'} sx={{ mr: 2 }} />

                          <JetInput
                            name={'city'}
                            label={'Город'}
                            placeholder={'Город'}
                            sx={{ mr: 2 }}

                          />

                          <JetInput
                            name={'street'}
                            label={'Улица'}
                            placeholder={'Улица'}
                            sx={{ mr: 2 }}

                          />
                          <JetInput
                            name={'houseNumber'}
                            label={'Дом'}
                            placeholder={'Дом'}

                          />
                        </Box>
                      </Box>
                    </Box>
                  </form>
                </FormProvider>
                :
                <FormProvider {...methods2}>
                  <form>
                    {
                      (activeStep == 1)
                        ?
                        <Box>
                          <Box className={style.providerInfoContainer}>
                            <JetSelect
                              selectLabel='Форма организации'
                              selectName='orgType'
                              options={[{ label: 'ИП', value: 'ip' }, { label: 'ООО', value: 'ooo' }, { label: 'АО', value: 'ao' }, { label: 'ОАО', value: 'oao' }]}
                              sx={{ width: '12rem' }}
                            />
                          </Box>

                          <Box>
                            <Typography className={style.providerInfoSubtitleTxt}>Основная информация</Typography>
                            <Typography variant='inherit'>Введите ИНН вашей организации. Мы его проверим и автоматически заполним основные данные</Typography>
                          </Box>

                          <Box sx={{ ...flexBetweenCenter, width: '50vw' }}>
                            <Box sx={dFlexCol}>
                              <JetInput name={'inn'} label={'ИНН'} placeholder={'ИНН'} inputProps={{ maxLength: 10 }} sx={{ mb: 1 }} />
                              <JetInput name={'ogrnip'} label={'ОГРНИП'} placeholder={'ОГРНИП'} />
                            </Box>

                            <Box sx={dFlexCol}>
                              {/*<JetInput name={'region'} label={'Регион'} placeholder={'Регион'} sx={{ mb: 1 }} />*/}
                              <JetInput name={'name'} label={'Наименование поставщика'} placeholder={'Наименование поставщика'} />
                            </Box>
                          </Box>
                        </Box>
                        :
                        (activeStep == 2)
                          ?
                          <Box>
                            <Box sx={dFlexCol}>
                              <JetInput
                                name='declarationNum'
                                variant='outlined'
                                label='Номер декларация ТР ТС'
                                placeholder='Номер декларация ТР ТС'
                                inputProps={{ maxLength: 10 }}
                                sx={{ width: '13rem', mb: 5 }}
                              />
                              <JetDatePicker
                                name='declarationDate'
                                label='Дата регистрации декларации ТР ТС'
                                format='DD.MM.YYYY'
                              />
                            </Box>
                          </Box>
                          :
                          (activeStep == 3)
                            ?
                            <Box>
                              <Box sx={dFlexCol}>
                                <JetInput
                                  name='sanBookNum'
                                  variant='outlined'
                                  label='Номер санитарной книги'
                                  placeholder='Номер санитарной книги'
                                  inputProps={{ maxLength: 10 }}
                                  sx={{ width: '13rem', mb: 5 }}
                                />
                                <JetDatePicker
                                  name='sanBookDate'
                                  label='Дата получения санитраной книги'
                                  format='DD.MM.YYYY'
                                />
                              </Box>
                            </Box>
                            :
                            (!getLoader)
                            ?
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                              <Box className={style.providerInfoSubtitle}>
                                <Typography className={style.providerInfoSubtitleTxt}>Краткое описание компании</Typography>
                              </Box>
                              <Box>
                                <JetInput
                                  name='description'
                                  label='Описание'
                                  placeholder='Описание'
                                  variant='filled'
                                  multiline={true}
                                  sx={{ width: '50%', mt:3}}
                                />
                              </Box>
                            </Box>
                            :
                            <Box sx={flexCenter}>
                              <JetSpinner />
                            </Box>
                    }
                  </form>
                </FormProvider>
            }

            <Box className={style.formBtnContainer}>
              <Button
                onClick={handleBackStep}
                variant="contained"
                color="primary"
                disabled={activeStep === 0}
                sx={{ mr: 1, width: '8rem' }}
              >
                Назад
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {
                (activeStep === steps.length - 1 || activeStep === steps.length)
                ?
                  <Button onClick={handleCompleteReg} variant="contained" sx={{ width: '8rem' }}>Готово</Button>
                :
                (activeStep === 0)
                ?
                  <Button onClick={handleCompleteRegCustomer} variant="contained" sx={{ width: '8rem' }}>Далее</Button>
                :
                  <Button onClick={handleNextStep} variant="contained" sx={{ width: '8rem' }}>Далее</Button>
              }
            </Box>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default JetSupplierLogin