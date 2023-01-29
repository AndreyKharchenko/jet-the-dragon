import React, { useEffect } from 'react'
import { Avatar, Box, Button, IconButton } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IProfileMyForm } from '../../../models/profile';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import JetInput from '../../common/form-components/JetInput';
import style from './JetCustomer.module.css';



const JetUserMy = () => {
  const methods = useForm<IProfileMyForm>();
  const onSubmit: SubmitHandler<IProfileMyForm> = (data: IProfileMyForm) => {
      console.log('data:', data);
  }

  useEffect(() => {
    methods.setValue('firstname', 'Андрей');
    methods.setValue('lastname', 'Харченко');
    methods.setValue('phone', '+79184561288');
    methods.setValue('email', '111@mail.ru');
    methods.setValue('city', 'Краснодар');
    methods.setValue('address', 'ул.Кореновская 39-54');
  }, [])

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ml:'10%'}}>
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
              <JetInput name='firstname' label='Имя' placeholder='Имя' />
            </Box>

            <Box className={style.defaultInput}>
              <JetInput name='lastname' label='Фамилия' placeholder='Фамилия' />
            </Box>

            <Box className={style.defaultInput}>
              <JetInput name='phone' label='Телефон' placeholder='Телефон' required={false} mask='phone'/>
            </Box>

            <Box className={style.defaultInput}>
              <JetInput name='email' label='E-mail' placeholder='E-mail' mask='email'/>
            </Box>
            
            <Box className={style.defaultInput}>
              <JetInput name='city' label='Город' placeholder='Город' />
            </Box>

            <Box className={style.defaultInput}>
              <JetInput name='address' label='Адрес' placeholder='Адрес' />
            </Box>
          
            <Button 
              type='submit' 
              color='primary' 
              variant='contained'
              sx={{margin: '1rem 0', width:'250px', borderRadius:5}} 
            >Сохранить
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
    
  )
}

export default JetUserMy