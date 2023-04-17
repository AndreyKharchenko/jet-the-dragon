import React, { useState } from 'react'
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dFlex, flexCenter } from '../../../themes/commonStyles';
import JetIcon from '../../common/JetIcon';
import JetLogo from '../../common/JetLogo';
import JetSidebar from '../../Sidebar/JetSidebar';
import JetSupplierAnalytics from './JetSupplierAnalytics';
import JetSupplierMain from './JetSupplierMain';
import JetSupplierProducts from './JetSupplierProducts';
import { useAppSelector } from '../../../hooks/useRedux';
import * as userSelectors from '../../../store/selectors/userSelectors';
import { logout } from '../../../api/userManager';
import JetSpinner from '../../common/JetSpinner';
import { flexBetweenCenter } from '../../../themes/commonStyles';
interface ISupplierProfileProps {
  page: string | null
}

const mocdata: mocItem[] = [
  { id: 1, label: 'Личный кабинет', icon: 'jet-account-outline', page: 'main' },
  { id: 2, label: 'Мои товары', icon: 'jet-products', page: 'products' },
  { id: 3, label: 'Аналитика', icon: 'jet-analytics', page: 'analytics' },
  { id: 4, label: 'Выход', icon: 'jet-exit', page: 'exit' },
]

type mocItem = { id: number, label: string, icon: string, page: string };

const JetSupplierProfile: React.FC<ISupplierProfileProps> = ({ page }) => {

  const [selectedItem, setSelectedItem] = useState<mocItem>(mocdata[0]);
  const navigate = useNavigate();
  const getLoader = useAppSelector(userSelectors.loader);

  const handleListItemClick = (item: mocItem) => {

    if (item.page.toUpperCase() == 'EXIT') {
      logout();
      //navigate(`/login/supplier`);
      navigate(`/`);
      return;
    }

    setSelectedItem(item);
    navigate(`/my/${item.page}`);
  }
  return (
    <>
      <Box sx={dFlex}>
        <JetSidebar>
          <Box sx={{ mt: 4, mb: 6 }}>
            <JetLogo />
          </Box>
          <Box>
            {
              mocdata.map((item, index) => (
                <ListItemButton
                  selected={selectedItem.id === item.id}
                  key={item.label}
                  sx={{
                    color: (index == mocdata.length - 1) ? '#eb4034' : '#3853D8',
                    mb: 1,
                    borderLeft: (selectedItem.id === item.id) ? '5px solid #3853D8' : 'none',
                  }}
                  onClick={() => handleListItemClick(item)}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <JetIcon icon={item.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                  />
                </ListItemButton>
              ))
            }
          </Box>
        </JetSidebar>
        <Box sx={(!getLoader) ? {mt:2} : {width:'100%', mt: 12, ...flexCenter }}>
          {
            (page?.toUpperCase() == 'MAIN')
            ?
              <JetSupplierMain />
            :
            (page?.toUpperCase() == 'PRODUCTS')
            ?
              <JetSupplierProducts />
            :
            (page?.toUpperCase() == 'ANALYTICS')
            ?
              <JetSupplierAnalytics />
            :
            null
          } 

          
        </Box>
      </Box>
    </>
  )
}

export default JetSupplierProfile;