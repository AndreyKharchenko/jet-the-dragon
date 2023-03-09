import { AppBar, Box, Container, Drawer } from '@mui/material'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetCustomerProfile from '../components/Profile/Customer/JetCustomerProfile'
import JetSupplierProfile from '../components/Profile/Supplier/JetSupplierProfile'
import { dFlex } from '../themes/commonStyles'
import JetSidebar from '../components/Sidebar/JetSidebar'
import { useAppSelector } from '../hooks/useRedux'


const PROFILE_TYPES = {
  SUPPLIER: 'SUPPLIER'
}

const ProfilePage = () => {

  const params = useParams();

  let [searchParams, setSearchParams] = useSearchParams();
  
  const getRole = useAppSelector(state => state.user.role);
  const orderId = searchParams.get('order');

  useEffect(() => {
  },[params,searchParams])

  return (
    <>
      <Box>
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