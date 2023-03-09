import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Fab, IconButton } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import JetInput from '../../common/form-components/JetInput';
import style from './JetCustomer.module.css';
import { ICustomerLoginForm } from '../../../models/login';
import { flexBetween, flexCenter } from '../../../themes/commonStyles';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getCustomerData, updateCustomer } from '../../../store/slices/userSlice';
import { IUpdateCustomer } from '../../../models/user';
import JetSpinner from '../../common/JetSpinner';




const JetCustomerMain = () => {
  const methods = useForm<ICustomerLoginForm>();
  let [disabled, setDisabled] = useState<boolean>(true);
  const getProfile = useAppSelector(state => state.user.customerProfile);
  const getLoader = useAppSelector(state => state.user.loader);
  const getToken = useAppSelector((state) => state.auth.token); 
  const dispatch = useAppDispatch();
  
  const onSubmit: SubmitHandler<ICustomerLoginForm> = async (data: ICustomerLoginForm) => {
      console.log('data:', data);
      try {
        const params = {...data, customerId: getProfile?.id || ''};
        const res = await dispatch(updateCustomer(params));
        
      } catch (error) {
        console.error('ERR: UpdateCustomer')
      }
      
      setDisabled(true);
  }

  useEffect(() => {
    const getProfileData = async () => {
      if(!getProfile) {
        await dispatch(getCustomerData(getToken?.profile.name));
      } 
    }

    getProfileData();


    if(!!getProfile) {
      for(let i in getProfile) {
        let name = i.toLowerCase() as any;
        let value = (getProfile as any)[i];
        if(name != 'id') {
          methods.setValue(name, value || '');
        }
      }
    } 
  },[getProfile])

  return (
    <Box>
      {getLoader && 
        <Box sx={{mt:10}}>
          <JetSpinner />
        </Box>
      }

      {!getLoader && 
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box>
              <Box sx={{ml:8}}>
                <Avatar 
                  sx={{ width:'100px', height:'100px' }}
                >
                  OP
                </Avatar>
                <IconButton color="primary" aria-label="upload picture" component="label" sx={{position:'relative', top:'-30px', left:'70px'}}>
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              </Box>
            
              <Box className={style.defaultInput}>
                <JetInput name='firstname' label='Имя' placeholder='Имя' disabled={disabled} />
              </Box>

              <Box className={style.defaultInput}>
                <JetInput name='lastname' label='Фамилия' placeholder='Фамилия' disabled={disabled} />
              </Box>

              <Box className={style.defaultInput}>
                <JetInput name='phone' label='Телефон' placeholder='Телефон' required={false} mask='phone' disabled={disabled} />
              </Box>

              <Box className={style.defaultInput}>
                <JetInput name='email' label='E-mail' placeholder='E-mail' mask='email' disabled={disabled} />
              </Box>

              <Box className={style.defaultInput}>
                <JetInput name='country' label='Страна' placeholder='Страна' disabled={disabled} />
              </Box>
              
              <Box className={style.defaultInput}>
                <JetInput name='city' label='Город' placeholder='Город' disabled={disabled} />
              </Box>

              <Box sx={{...flexBetween, width: '60vw'}}>
                <Box className={style.defaultInput}>
                  <JetInput name='street' label='Улица' placeholder='Адрес' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='housenumber' label='Дом' placeholder='Адрес' disabled={disabled} />
                </Box>

                <Box className={style.defaultInput}>
                  <JetInput name='flatnumber' label='Квартира' placeholder='Адрес' disabled={disabled} />
                </Box>
              </Box>
            
              <Button 
                type='submit' 
                color='primary' 
                variant='contained'
                sx={{margin: '1rem 0', width:'250px', borderRadius:5}} 
              >Сохранить
              </Button>
            </Box>

            <Fab color="primary" sx={{ position:'fixed', right: '100px', bottom: '100px' }} onClick={() => setDisabled(false)}>
              <EditIcon />
            </Fab>
          </form>
        </FormProvider>
      }
    </Box>
    
  )
}

export default JetCustomerMain