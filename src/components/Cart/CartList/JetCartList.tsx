import React from 'react'
import { List } from '@mui/material'
import JetCartItem from './JetCartItem'
import { IFullOrder } from '../../../models/order'

interface ICartList {
    orders: IFullOrder[],
    removeCartItem: (id: string) => void,
    decrementQty: (cartItem: IFullOrder) => void,
    incremntQty: (cartItem: IFullOrder) => void,
}

const JetCartList: React.FC<ICartList> = ({orders, removeCartItem, decrementQty, incremntQty}) => {
  return (
    <>
        <List>
            {
                orders.map(order => {
                    return(
                        <JetCartItem 
                            key={order.id}
                            order={order}
                            removeCartItem={removeCartItem}
                            decrementQty={decrementQty}
                            incremntQty={incremntQty}
                        />
                    )
                })
            }
            
        </List>
    </>
  )
}

export default JetCartList