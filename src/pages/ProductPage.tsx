import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import JetFooter from '../components/Footer/JetFooter'
import JetHeader from '../components/Header/JetHeader'
import JetOptionsTab from '../components/OptionsTab/JetOptionsTab'
import JetProduct from '../components/Product/JetProduct'
import { useAppSelector } from '../hooks/useRedux'
import { IFullProduct } from '../models/product'
import * as catalogSelectors from '../store/selectors/catalogSelectors';

const ProductPage:React.FC<{}> = () => {
  const params = useParams();
  const products = useAppSelector(catalogSelectors.products);
  const [product, setProduct] = useState<IFullProduct>();

  useEffect(() => {
    const currentProduct = products.find(it => it.id == params.id);
    setProduct(currentProduct);
  },[])

  return (
    <Box sx={{display: 'flex',flexDirection: 'column', height: '100vh'}}>
        <Box>
          <JetHeader headerType='product' />
          <JetOptionsTab />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: 100,
          overflowY: 'scroll',
        }}>
          <Container maxWidth="xl" sx={{m: '2rem auto', height:'100%'}}>
            { product && <JetProduct product={product} /> }
          </Container>
        </Box>
        <Box>
          <JetFooter />
        </Box>
    </Box>
  )
}

export default ProductPage