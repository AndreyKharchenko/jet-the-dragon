import React, {useEffect, useState} from 'react'
import { Avatar, Button, FormControlLabel, Grid, Paper, TextField, Typography, Link, Checkbox, Box, Autocomplete } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { ICustomerLoginForm } from '../../models/login';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { JetInput } from '../common/form-components/JetInput';
import { JetCheckbox } from '../common/form-components/JetCheckbox';
import { useNavigate } from 'react-router-dom';
import { dFlex, flexAround, flexBetween } from '../../themes/commonStyles';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { createCustomer } from '../../store/slices/userSlice';
import * as authSelectors from '../../store/selectors/authSelectors';
// Sign-in or sign-up
type actionType = {
  isSignIn: boolean,
  text: string
}



const JetUserLogin: React.FC<{}> = (props) => {
  /*const [action, setAction] = useState<actionType>({
    isSignIn: true,
    text: 'Войти'
  });*/

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<ICustomerLoginForm>();
  const token = useAppSelector(authSelectors.accessToken);

  const onSubmit: SubmitHandler<ICustomerLoginForm> = async (data: ICustomerLoginForm) => {
      console.log('data:', data);
      try {
        const res: any = await dispatch(createCustomer(data));
        console.log('res', res);
        if(!!res.customerId) {
          navigate(`/my/main`);
        }
      } catch (error) {
        console.error('ERR: Submit Customer Login Form', error);
      }
      
  }

  useEffect(() => {
    //setAction({isSignIn: !action.isSignIn, text: (!action.isSignIn) ? 'Войти' : 'Создать профиль'});
    if(token?.profile.name) {
      methods.setValue('email', token?.profile.name);
    }
    
  },[])

  return (
    <Grid>
      <Paper elevation={10} sx={{padding:20, height: '57vh', width: 280, margin: '20px auto'}}>
          <Grid container item alignItems='center' flexDirection='column' sx={{position:'absolute', top:'80px', left:'0px'}}>
            <Avatar sx={{backgroundColor: '#3853D8'}}><LockOutlined /></Avatar>
            <Box sx={{textTransform: 'uppercase'}}>
              {/*<h2>{action.text}</h2>*/}
              <h2>Войти</h2>
            </Box>
          </Grid>

          {/*{*/}
            {/*(action.isSignIn)
            ?
              <Box sx={{mb: 1}}>
                <FormProvider {...methods}>
                
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <JetInput name='email' label='E-mail' placeholder='E-mail' fullWidth={true} mask='email' sx={{mb:1.5}} />
                    <JetInput name='password' label='Пароль' placeholder='Пароль' type={'password'} fullWidth={true} sx={{mb:1}} />
                    <JetCheckbox name='rememberMe' label='Запомнить меня' value={false} />
                    

                    <Button 
                      type='submit' 
                      color='primary' 
                      variant='contained' 
                      sx={{margin: '1rem 0', borderRadius: 5}} 
                      fullWidth
                    >{action.text}
                    </Button>
                  </form>
                </FormProvider>
              </Box>
            :*/}
              <Box sx={{mb: 1}}>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <JetInput name='firstname' label='Имя' placeholder='Имя' fullWidth={true} />
                    <JetInput name='lastname' label='Фамилия' placeholder='Фамилия' fullWidth={true} sx={{mb:1}} />

                    <Box sx={{...flexAround}}>
                      <JetInput name='email' label='E-mail' placeholder='E-mail' mask='email' sx={{mr:1}} disabled={true} />
                      <JetInput name='phone' label='Телефон' placeholder='Телефон' mask='phone' />
                    </Box>

                    {/*<Box sx={{...flexAround}}>
                      <JetInput name='password' label='Пароль' placeholder='Пароль' type={'password'}  sx={{mr:1}} />
                      <JetInput name='checkPwd' label='Подтвердите пароль' placeholder='Подтвердите пароль' type={'password'} />
                    </Box>*/}

                    <JetInput name='country' label='Страна' placeholder='Страна' fullWidth={true} />

                    <Box sx={{...flexAround}}>
                      <JetInput name='city' label='Город' placeholder='Город' sx={{mr:1}} />
                      <JetInput name='street' label='Улица' placeholder='Улица'  />
                    </Box>

                    <Box sx={{...flexAround}}>
                      <JetInput name='housenumber' label='Дом' placeholder='Дом' sx={{width:'80px'}} />
                      <JetInput name='flatnumber' label='Квартира' placeholder='Квартира' sx={{width:'80px'}} required={false} />
                    </Box>

                    {/*<JetCheckbox name='rememberMe' label='Запомнить меня' value={false} />*/}

                    <Button 
                      type='submit' 
                      color='primary' 
                      variant='contained' 
                      sx={{margin: '1rem 0', borderRadius: 5}} 
                      fullWidth
                    >
                      {/*action.text*/}
                      Создать
                    </Button>
                  </form>
                </FormProvider>
              </Box>
          {/*}*/}

          {/*
            (action.isSignIn)
            ?
              <Box>
                <Typography
                  sx={{cursor:'pointer'}}
                  onClick={() => console.log('#')}
                >
                  Забыли пароль?
                </Typography>
                <Typography 
                  sx={{cursor: 'pointer', color: theme => theme.palette.primary.main}}
                  onClick={(() => setAction({isSignIn: !action.isSignIn, text: (!action.isSignIn) ? 'Войти' : 'Создать профиль'}))}
                > 
                  Вы новый пользователь? Создать профиль
                </Typography>
              </Box>
            :
              <></>
                  */}
      </Paper>
    </Grid>
  )
}

export default JetUserLogin;