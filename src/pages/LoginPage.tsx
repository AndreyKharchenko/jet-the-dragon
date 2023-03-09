import React from 'react'
import JetUserLogin from '../components/Login/JetUserLogin';
import JetSupplierLogin from '../components/Login/JetSupplierLogin';
import { useParams } from 'react-router-dom';

const LOGIN_TYPES = {
  SUPPLIER: 'SUPPLIER'
}

const LoginPage:React.FC<{}> = () => {
  const {id} = useParams();

  return (
    (id?.toUpperCase() == LOGIN_TYPES['SUPPLIER'])
    ?
      <JetSupplierLogin />
    :
      <JetUserLogin />
  )
}

export default LoginPage;