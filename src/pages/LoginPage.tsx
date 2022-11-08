import React from 'react'
import JetUserLogin from '../components/Login/JetUserLogin';
import JetProviderLogin from '../components/Login/JetProviderLogin';
import { useParams } from 'react-router-dom';

const LOGIN_TYPES = {
  PROVIDER: 'PROVIDER'
}

const LoginPage:React.FC<{}> = () => {
  const {id} = useParams();
  console.log('TYPE', id);
  return (
    (id?.toUpperCase() == LOGIN_TYPES['PROVIDER'])
    ?
      <JetProviderLogin />
    :
      <JetUserLogin />
  )
}

export default LoginPage;