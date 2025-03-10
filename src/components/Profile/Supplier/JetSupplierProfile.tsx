import React, { useState } from 'react'
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dFlex } from '../../../themes/commonStyles';
import JetIcon from '../../common/JetIcon';
import JetLogo from '../../common/JetLogo';
import JetSidebar from '../../Sidebar/JetSidebar';
import JetSupplierAnalytics from './JetSupplierAnalytics';
import JetSupplierMain from './JetSupplierMain';
import JetSupplierProducts from './JetSupplierProducts';
import { useAppSelector } from '../../../hooks/useRedux';
import * as userSelectors from '../../../store/selectors/userSelectors';
import { logout } from '../../../api/userManager';
import JetSupplierActiveOrders from './JetSupplierActiveOrders';
import JetSupplierTechMap from './JetSupplierTechMap';
interface ISupplierProfileProps {
  page: string | null
}

const listItems: mocItem[] = [
  { id: 1, label: 'Личный кабинет', icon: 'jet-account-outline', page: 'main' },
  { id: 2, label: 'Мои товары', icon: 'jet-products', page: 'products' },
  { id: 3, label: 'Активные заказы', icon: 'jet-active-orders', page: 'active_orders' },
  { id: 4, label: 'Аналитика', icon: 'jet-analytics', page: 'analytics' },
  { id: 5, label: 'Технологическая карта', icon: 'jet-tech-map', page: 'tech_map' },
  { id: 6, label: 'Выход', icon: 'jet-exit', page: 'exit' },
]

type mocItem = { id: number, label: string, icon: string, page: string };

const JetSupplierProfile: React.FC<ISupplierProfileProps> = ({ page }) => {

  const [selectedItem, setSelectedItem] = useState<mocItem>(listItems[0]);
  const navigate = useNavigate();

  const handleListItemClick = (item: mocItem) => {

    if (item.page.toUpperCase() == 'EXIT') {
      logout();
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
            <JetLogo color='#FFF' />
          </Box>
          <Box>
            {
              listItems.map((item, index) => (
                <ListItemButton
                  selected={selectedItem.id === item.id}
                  key={item.label}
                  sx={{
                    //color: (index == listItems.length - 1) ? '#eb4034' : '#673ab7',
                    color: '#FFF',
                    mb: 1,
                    borderLeft: (selectedItem.id === item.id) ? '5px solid #FFF' : 'none',
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
        <Box sx={{mt: 2}}>
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
            (page?.toUpperCase() == 'ACTIVE_ORDERS')
            ?
              <JetSupplierActiveOrders />
            :
            (page?.toUpperCase() == 'TECH_MAP')
            ?
              <JetSupplierTechMap />
            :
            null
          }
        </Box>
      </Box>
    </>
  )
}

export default JetSupplierProfile;