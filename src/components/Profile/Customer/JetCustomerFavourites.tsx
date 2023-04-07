import React, { useEffect, useState } from 'react'
import JetProductCards from '../../ProductCards/JetProductCards'
import { useAppSelector } from '../../../hooks/useRedux'
import * as userSelectors from '../../../store/selectors/userSelectors';
import * as catalogSelectors from '../../../store/selectors/catalogSelectors';
import { IFullProduct } from '../../../models/product';


const JetCustomerFavourites: React.FC<{}> = () => {
  const products = useAppSelector(catalogSelectors.products);
  const favourities = useAppSelector(userSelectors.custFavourities);
  let [favProducts, setFavProducts] = useState<IFullProduct[]>([]);
  
  useEffect(() => {
    const favouriteIds = favourities.map(it => it.productId);
    const favProd = products.filter(it => {
      if(favouriteIds.indexOf(it.id) != -1) {
        return it;
      }
    })

    if(favProd.length) {
      setFavProducts(favProd);
    }
    
  }, [])
  return (
    <>
        <JetProductCards prodTitle='Избранное' products={favProducts} favourities={favourities} />
    </>
  )
}

export default JetCustomerFavourites