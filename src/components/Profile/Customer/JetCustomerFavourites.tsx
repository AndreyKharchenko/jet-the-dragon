import React from 'react'
import JetProductCards from '../../ProductCards/JetProductCards'


const JetCustomerFavourites: React.FC<{}> = () => {
  return (
    <>
      <JetProductCards prodTitle='Избранное' products={[]} />
    </>
  )
}

export default JetCustomerFavourites