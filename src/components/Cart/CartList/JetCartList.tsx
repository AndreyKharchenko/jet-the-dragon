import React from 'react'
import { List } from '@mui/material'
import JetCartItem from './JetCartItem'
import { IProduct } from '../../../models/product'

interface ICartList {
    products: IProduct[],
    removeCartItem: (cartItem: IProduct) => void,
    decrementQty: (id: number) => void,
    incremntQty: (id: number) => void,
}

const JetCartList: React.FC<ICartList> = ({products, removeCartItem, decrementQty, incremntQty}) => {
  return (
    <>
        <List>
            {
                products.map(val => {
                    return(
                        <JetCartItem 
                            product={val}
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