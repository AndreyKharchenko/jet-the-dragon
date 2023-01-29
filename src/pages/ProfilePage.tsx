import { AppBar, Box, Container, Drawer } from '@mui/material'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetUserProfile from '../components/Profile/User/JetUserProfile'
import JetSupplierProfile from '../components/Profile/Supplier/JetSupplierProfile'
import { dFlex } from '../themes/commonStyles'
import JetSidebar from '../components/Sidebar/JetSidebar'


const PROFILE_TYPES = {
  SUPPLIER: 'SUPPLIER'
}

const ProfilePage = () => {

  const params = useParams();
  
  

  return (
    <>
      <Box>
        <Box sx={{background: '#FFF'}}>
          <JetHeader headerType='profile' />
        </Box>
        
        
        <Container maxWidth="xl" sx={{height:'100%'}}>
            {
              (params.userType == PROFILE_TYPES['SUPPLIER'])
              ?
                <JetSupplierProfile id={params.id || null} page={params.page || null} />
              :
                <JetUserProfile id={params.id || null} page={params.page || null} />
            }
        </Container>
      </Box>
    </>
      
  )
}

export default ProfilePage