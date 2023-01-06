import React, { useState } from 'react'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Paper, Step, StepButton, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form';
import JetInput  from '../common/form-components/JetInput';
import JetSelect from '../common/form-components/JetSelect';
import JetDatePicker from '../common/form-components/JetDatePicker';
import style from './JetLogin.module.css';
import { flexBetweenCenter, dFlexCol } from '../../themes/commonStyles';
import { IProviderForm } from '../../models/login';
import { useNavigate } from 'react-router-dom';


const steps = ['Информация о физическом лице','Сведения об ИП', 'Декларация соответствия ТР ТС','Сведения о санитарной книге', 'Почти готово!'];

const JetSupplierLogin: React.FC<{}> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const navigate = useNavigate();

  const methods = useForm<IProviderForm>();

  const handleStep = async (step: number) => {
    console.log('step', step);
    if(!await methods.trigger()) {
      return;
    }
    setActiveStep(step);
  };

  const handleNextStep = async () => {

    if(!await methods.trigger()) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompleteReg = (data: IProviderForm) => {
    console.log('complete registration', data);
    navigate(`/profile/supplier/1`);


  };
  return (
    <Grid>
      <Paper elevation={10} sx={{padding:20, height: '55vh', width: '55vw', margin: '20px auto'}}>
          <Grid container alignItems='center' flexDirection='column' sx={{position:'absolute', top:'80px', left:'0px'}}>
            <Avatar sx={{backgroundColor: '#3853D8'}}><LockOutlined /></Avatar>
            <Box sx={{textTransform: 'uppercase'}}>
              <h2>Join</h2>
            </Box>
          </Grid>

          <Grid container alignItems='center' flexDirection='row' sx={{justifyContent: 'center', mt: 3, cursor:'pointer'}}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {
                steps.map((step,index) => (
                  <Step key={step}>
                    <StepLabel color='#3853D8' onClick={() => handleStep(index)}>
                      {step}
                    </StepLabel>
                  </Step>
                ))
              }
            </Stepper>
          </Grid>

          <Grid container alignItems='center' sx={{mt:4}}>
            <div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleCompleteReg)}>
                  {
                    ( activeStep == 0 )
                    ?
                      <Box>
                        <Box className={style.providerInfoContainer}>
                          <Box>
                            <Typography className={style.providerInfoSubtitleTxt}>Укажите ФИО</Typography>
                          </Box>
                          <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <JetInput name={'surname'} label={'Фамилия'} placeholder={'Фамилия'} sx={{ mr:2 }} />
                            <JetInput name={'name'} label={'Имя'} placeholder={'Имя'} sx={{ mr:2 }} />
                            <JetInput name={'patronymic'} label={'Отчество'} placeholder={'Отчество'} />
                          </Box>
                        </Box>

                        <Box className={style.providerInfoContainer}>
                          <Box className={style.providerInfoSubtitle}>
                            <Typography className={style.providerInfoSubtitleTxt}>Укажите номер телефона</Typography>
                          </Box>
                          <Box>
                            <JetInput name={'phone'} label={'Телефон'} placeholder={'Телефон'} mask='phone' />
                          </Box>
                        </Box>

                        <Box>
                          <Box className={style.providerInfoSubtitle}>
                            <Typography className={style.providerInfoSubtitleTxt}>Укажите E-mail</Typography>
                          </Box>
                          <Box>
                            <JetInput name={'email'} label={'E-mail'} placeholder={'E-mail'} mask='email' />
                          </Box>
                        </Box>
                      </Box>
                    :
                    ( activeStep == 1 )
                    ?
                      <Box>
                        <Box className={style.providerInfoContainer}>
                          <JetSelect 
                            selectLabel='Страна' 
                            selectName='country' 
                            options={[{label: 'Россия', value: 'rus'}]}
                            sx={{width:'7rem'}}
                          />
                        </Box>

                        <Box className={style.providerInfoContainer}>
                          <JetSelect 
                            selectLabel='Форма организации' 
                            selectName='orgFormat' 
                            options={[{label: 'ИП', value: 'ip'}]}
                            sx={{width:'12rem'}}
                          />
                        </Box>

                        <Box>
                          <Typography className={style.providerInfoSubtitleTxt}>Основная информация</Typography>
                          <Typography variant='inherit'>Введите ИНН вашей организации. Мы его проверим и автоматически заполним основные данные</Typography>
                        </Box>
                        
                        <Box sx={flexBetweenCenter}>
                          <Box sx={dFlexCol}>
                            <JetInput name={'inn'} label={'ИНН'} placeholder={'ИНН'} inputProps={{maxLength:10}} sx={{width:'13rem', mb: 1}} />                          
                            <JetInput name={'providerName'} label={'Наименование поставщика'} placeholder={'Наименование поставщика'} sx={{width:'13rem', mb:1}} />
                          </Box>

                          <Box sx={dFlexCol}>
                            <JetInput name={'chiefName'} label={'ФИО руководителя'} placeholder={'ФИО руководителя'} sx={{width:'13rem', mb:1}} />
                            <JetInput name={'ogrnip'} label={'ОГРНИП'} placeholder={'ОГРНИП'} sx={{width:'13rem'}} />
                          </Box>
                        </Box>
                      </Box>
                    :
                    ( activeStep == 2 )
                    ?
                      <Box>
                        <Box sx={dFlexCol}>
                          <JetInput 
                            name='decNum' 
                            variant='outlined' 
                            label='Номер декларация ТР ТС' 
                            placeholder='Номер декларация ТР ТС' 
                            inputProps={{maxLength:10}} 
                            sx={{width:'13rem', mb: 5}} 
                          />
                          <JetDatePicker 
                            name='decDt' 
                            label='Дата регистрации декларации ТР ТС' 
                            format='DD.MM.YYYY'
                          />
                        </Box>
                      </Box>
                    :
                    ( activeStep == 3 )
                    ?
                      <Box>
                        <Box sx={dFlexCol}>
                          <JetInput 
                            name='sanBookNum' 
                            variant='outlined'
                            label='Номер санитарной книги' 
                            placeholder='Номер санитарной книги'
                            inputProps={{maxLength:10}}  
                            sx={{width:'13rem', mb: 5}} 
                          />
                          <JetDatePicker 
                            name='sanBookDt' 
                            label='Дата получения санитраной книги' 
                            format='DD.MM.YYYY'
                          />
                        </Box>
                      </Box>
                    :
                      <Box>
                        <Typography variant='h1'>Всё готово!</Typography>
                      </Box>
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
                        <Button type='submit' variant="contained" sx={{width: '8rem'}}>Готово</Button>
                      :
                        <Button onClick={handleNextStep} variant="contained" sx={{width: '8rem'}}>Далее</Button>
                    }
                  </Box>
                </form>
              </FormProvider>
            </div>
          </Grid>
      </Paper>
    </Grid>
  )
}

export default JetSupplierLogin