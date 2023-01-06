import { Box, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetUserProfile from '../components/Profile/JetUserProfile'
import JetSupplierProfile from '../components/Profile/JetSupplierProfile'

const PROFILE_TYPES = {
  SUPPLIER: 'SUPPLIER'
}

const ProfilePage = () => {

  const {id, type} = useParams();
  console.log('ID', id);
  console.log('TYPE', type);
  return (
    <Box sx={{display: 'flex',flexDirection: 'column', height: '100vh'}}>
        <Box>
          <JetHeader headerType='profile' />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: 100,
          overflowY: 'scroll',
        }}>
          <Container maxWidth="xl" sx={{height:'100%'}}>
            {
              (type?.toUpperCase() == PROFILE_TYPES['SUPPLIER'])
              ?
                <JetSupplierProfile id={id || null}/>
              :
                <JetUserProfile id={id || null} />
            }
          
            
          </Container>
        </Box>
        <Box>
          <JetFooter />
        </Box>
    </Box>
  )
}

export default ProfilePage