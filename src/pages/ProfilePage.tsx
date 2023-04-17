import React, { useEffect } from 'react'
import { Box, Container, Drawer } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import JetHeader from '../components/Header/JetHeader'
import JetCustomerProfile from '../components/Profile/Customer/JetCustomerProfile'
import JetSupplierProfile from '../components/Profile/Supplier/JetSupplierProfile'
import { useAppSelector } from '../hooks/useRedux'
import * as userSelectors from '../store/selectors/userSelectors';

const PROFILE_TYPES = {
  SUPPLIER: 'SUPPLIER'
}

const ProfilePage: React.FC<{}> = () => {

  const params = useParams();

  let [searchParams, setSearchParams] = useSearchParams();
  
  const getRole = useAppSelector(userSelectors.userRole);
  const orderId = searchParams.get('order');

  useEffect(() => {
  },[params,searchParams])

  return (
    <>
      <Box
        
      >
        <Box sx={{background: '#FFF'}}>
          <JetHeader headerType='profile' />
        </Box>
        
        
          <Container maxWidth="xl" sx={{height:'100%'}}>
              {!!getRole &&
                (getRole.toUpperCase() == PROFILE_TYPES['SUPPLIER'])
                ?
                  <JetSupplierProfile page={params.page || null} />
                :
                  <JetCustomerProfile 
                    page={params.page || null} 
                    orderId={orderId || null} 
                  />
              }
          </Container>
        </Box>
      
    </>
      
  )
}

export default ProfilePage