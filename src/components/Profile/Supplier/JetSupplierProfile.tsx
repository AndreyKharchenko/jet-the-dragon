import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import { dFlex } from '../../../themes/commonStyles';
import JetIcon from '../../common/JetIcon';
import JetSidebar from '../../Sidebar/JetSidebar';

interface ISupplierProfileProps {
  id: number | string | null
}

const mocdata: mocItem[] = [
  {id: 1, label: 'Личный кабинет', icon: 'jet-account-outline'},
  {id: 2, label: 'Моя корзина', icon: 'jet-cart'},
  {id: 3, label: 'Мои заказы', icon: 'jet-order'},
  {id: 4, label: 'Мои возвраты', icon: 'jet-return-order'},
  {id: 5, label: 'Купленные товары', icon: 'jet-purchased'},
  {id: 6, label: 'Избранное', icon: 'jet-favourite'},
  {id: 7, label: 'Выход', icon: 'jet-exit'},
]

type mocItem = {id: number, label: string, icon: string};

const JetSupplierProfile: React.FC<ISupplierProfileProps> = ({id}) => {
  
  const [selectedItem, setSelectedItem] = useState<mocItem>(mocdata[0]);
  const handleListItemClick = (item: mocItem) => {
    setSelectedItem(item);
  }
  return (
    <>
      <Box sx={dFlex}>
        <JetSidebar>
          <Box sx={{mt:15}}>
            {
              mocdata.map((item, index) => (
                <ListItemButton
                  selected={selectedItem.id === item.id}
                  key={item.label}
                  sx={{ color: (index == mocdata.length - 1) ? '#eb4034' : '#3853D8', mb: 1 }}
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

        <Box>{selectedItem.label}</Box>
      </Box>
    </>
  )
}

export default JetSupplierProfile;