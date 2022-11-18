import React, {useState} from 'react'
import { Avatar, Button, FormControlLabel, Grid, Paper, TextField, Typography, Link, Checkbox, Box, Autocomplete } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { CountryType, IFormInputs } from '../../models/login';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { JetInput } from '../common/form-components/JetInput';
import { JetCheckbox } from '../common/form-components/JetCheckbox';

// Sign-in or sign-up
type actionType = {
  isSignIn: boolean,
  text: string
}



const JetUserLogin: React.FC<{}> = (props) => {
  //const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [action, setAction] = useState<actionType>({
    isSignIn: true,
    text: 'Sign In'
  });

  /*const //handleCheckbox = (value: boolean) => {
    setRememberMe(value);
  }*/

  //const {register, handleSubmit, watch, formState: {errors}} = useForm<IFormInputs>();
  const methods = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
      console.log('data:', data);
  }

  const countries: readonly CountryType[] = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE',label: 'United Arab Emirates',phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG',label: 'Antigua and Barbuda',phone: '1-268'  },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
  ]
  return (
    <Grid>
      <Paper elevation={10} sx={{padding:20, height: '57vh', width: 280, margin: '20px auto'}}>
          <Grid container alignItems='center' flexDirection='column' sx={{position:'absolute', top:'80px', left:'0px'}}>
            <Avatar sx={{backgroundColor: '#3853D8'}}><LockOutlined /></Avatar>
            <Box sx={{textTransform: 'uppercase'}}>
              <h2>{action.text}</h2>
            </Box>
          </Grid>

          {
            (action.isSignIn)
            ?
              <Box sx={{mb: 1}}>
                <FormProvider {...methods}>
                
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <JetInput name='username' label='Username' placeholder='Enter username' fullWidth={true} sx={{mb:1.5}} />
                    <JetInput name='password' label='Password' placeholder='Enter password' type={'password'} fullWidth={true} sx={{mb:1}} />
                    <JetCheckbox name='rememberMe' label='Remember me' value={false} />
                    

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
            :
              <Box sx={{mb: 1}}>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <JetInput name='username' label='Username' placeholder='Enter username' fullWidth={true} sx={{mb:1.5}} />
                    <JetInput name='password' label='Password' placeholder='Enter password' type={'password'} fullWidth={true} sx={{mb:1.5}} />
                    <JetInput name='checkPwd' label='Confirm password' placeholder='Enter password' type={'password'} fullWidth={true} sx={{mb:1.5}} />
                    <JetInput name='eMail' label='E-mail/phone' placeholder='E-mail/phone' fullWidth={true} sx={{mb:3}} />
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ width: 280, mb:1 }}
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', 
                          }}
                        />
                      )}
                    />

                    
                    <JetInput name='city' label='City' placeholder='City' fullWidth={true} sx={{mb:1}} />

                    {/*<FormControlLabel 
                          label='Remember me' 
                          control={
                            <Checkbox  
                              checked={rememberMe} 
                              onChange={(e) => handleCheckbox(!rememberMe)}
                              
                            />
                          }
                        />*/}
                    <JetCheckbox name='rememberMe' label='Remember me' value={false} />

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
          }

          {/*<FormControlLabel 
              label='Remember me' 
              control={
                <Checkbox  
                 // checked={rememberMe} 
                  onChange={(e) => handleCheckbox(!rememberMe)}
                />
              }
          />

          <Button 
            type='submit' 
            color='primary' 
            variant='contained' 
            sx={{margin: '1rem 0', borderRadius: 5}} 
            fullWidth
          >{action.text}
            </Button>*/}

          {
            (action.isSignIn)
            ?
              <Box>
                <Typography
                  sx={{cursor:'pointer'}}
                  onClick={() => console.log('#')}
                >
                  Forgot password?
                </Typography>
                <Typography 
                  sx={{cursor: 'pointer', color: theme => theme.palette.primary.main}}
                  onClick={(() => setAction({isSignIn: !action.isSignIn, text: (!action.isSignIn) ? 'Sign In' : 'Sign Up'}))}
                > 
                  Are you new user? Sign up
                </Typography>
              </Box>
            :
              <></>
          }
      </Paper>
    </Grid>
  )
}

export default JetUserLogin;