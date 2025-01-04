import React from "react";
import { useMemo, useEffect } from 'react';
import {Apple, Egg, KebabDining, SetMeal, AccountCircleOutlined, Logout, PersonAddAltOutlined, 
  GroupAddOutlined, ShoppingCartOutlined, ShoppingBagOutlined,
  ShoppingCartCheckoutOutlined, InventoryOutlined, BookmarkBorderOutlined,
  ExitToAppOutlined, Inventory, Timeline, SupervisedUserCircleOutlined, Storefront,
  BakeryDining, DinnerDining, DonutSmall, BrightnessLow, Cake, PendingActions, AccountTree, DeleteOutlineOutlined} from '@mui/icons-material';
type PropsType = {
    icon: string,
    fontSize?: 'small' | 'medium' | 'large'
}

const SvgIcon: React.FC<PropsType> = (props) => {
  const icons = [
    { icon: <KebabDining fontSize={props.fontSize || 'medium'} />, name: 'jet-beef', label: 'Мясо' },
    { icon: <SetMeal fontSize={props.fontSize || 'medium'} />, name: 'jet-fish', label: 'Рыба' },
    { icon: <Egg fontSize={props.fontSize || 'medium'} />, name: 'jet-egg', label: 'Свежие яйца' },
    { icon: <Apple fontSize={props.fontSize || 'medium'} />, name: 'jet-fruit', label: 'Фрукты' },
    { icon: <Storefront fontSize={props.fontSize || 'medium'} />, name: 'jet-all-products' },
    { icon: <BakeryDining fontSize={props.fontSize || 'medium'} />, name: 'jet-flour' },
    { icon: <DinnerDining fontSize={props.fontSize || 'medium'} />, name: 'jet-pasta' },
    { icon: <DonutSmall fontSize={props.fontSize || 'medium'} />, name: 'jet-beans' },
    { icon: <BrightnessLow fontSize={props.fontSize || 'medium'} />, name: 'jet-vegetables' },
    { icon: <Cake fontSize={props.fontSize || 'medium'} />, name: 'jet-candy' },
    { icon: <AccountCircleOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-account-outline',  },
    { icon: <Logout fontSize={props.fontSize || 'medium'} />, name: 'jet-logout',  },
    { icon: <PersonAddAltOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-add-person' },
    { icon: <GroupAddOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-add-group-outline' },
    { icon: <ShoppingCartOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-cart' },
    { icon: <ShoppingBagOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-order' },
    { icon: <ShoppingCartCheckoutOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-return-order' },
    { icon: <InventoryOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-purchased' },
    { icon: <BookmarkBorderOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-favourite' },
    { icon: <ExitToAppOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-exit' },
    { icon: <Inventory fontSize={props.fontSize || 'medium'} />, name: 'jet-products' },
    { icon: <Timeline fontSize={props.fontSize || 'medium'} />, name: 'jet-analytics' },
    { icon: <PendingActions fontSize={props.fontSize || 'medium'} />, name: 'jet-active-orders' },
    { icon: <SupervisedUserCircleOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-supplier-outline' },
    { icon: <AccountTree fontSize={props.fontSize || 'medium'} />, name: 'jet-tech-map' },
    { icon: <DeleteOutlineOutlined fontSize={props.fontSize || 'medium'} />, name: 'jet-trash' },
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