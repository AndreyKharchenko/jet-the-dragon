import React from "react";
import { useMemo, useEffect } from 'react';
import {Apple, Egg, KebabDining, SetMeal, AccountCircleOutlined, Logout, PersonAddAltOutlined, GroupAddOutlined} from '@mui/icons-material';
type PropsType = {
    icon: string
}

const SvgIcon: React.FC<PropsType> = (props) => {
  const icons = [
    { icon: <KebabDining />, name: 'jet-beef', label: 'Мясо' },
    { icon: <SetMeal />, name: 'jet-fish', label: 'Рыба' },
    { icon: <Egg />, name: 'jet-egg', label: 'Свежие яйца' },
    { icon: <Apple />, name: 'jet-fruit', label: 'Фрукты' },
    { icon: <AccountCircleOutlined />, name: 'jet-account-outline',  },
    { icon: <Logout />, name: 'jet-logout',  },
    { icon: <PersonAddAltOutlined />, name: 'jet-add-person'},
    { icon: <GroupAddOutlined />, name: 'jet-add-group-outline'},
  ]

  const icon = useMemo(() => {
    let i = null;
    i = icons.filter((i) => (i.name === props.icon));
    return i[0];
  }, []);

  return (
    <>
        { icon.icon }
    </>
  );
}



export default SvgIcon;