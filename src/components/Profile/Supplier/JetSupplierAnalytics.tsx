import React from 'react'
import JetDataTable from '../../DataTable/JetDataTable'
import { Box, Button } from '@mui/material'
import style from './JetSupplier.module.css';

const mocRows = [
  {
    id: '1',
    productName: 'Баранина',
    productSalesCount: 100,
    productProfit: 10000,
  },
  {
    id: '2',
    productName: 'Клубника',
    productSalesCount: 120,
    productProfit: 10200,
  },
  {
    id: '3',
    productName: 'Макароны',
    productSalesCount: 140,
    productProfit: 10400,
  },

]

const mocColumns = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'productName',
    label: 'Наименование продукта',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'productSalesCount',
    label: 'Количество проданного продукта',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'productProfit',
    label: 'Выручка от продаж',
    numeric: true,
    disablePadding: false,
  },
]


const JetSupplierAnalytics = () => {
  return (
    <>
      <Box className={style.titleNotFixed}>Аналитика</Box>

      <Box className={style.analyticToolbar}>
        <Button variant='outlined'>Диаграмма</Button>
      </Box>

      <JetDataTable rows={mocRows} columns={mocColumns} />
    </>
  )
}

export default JetSupplierAnalytics