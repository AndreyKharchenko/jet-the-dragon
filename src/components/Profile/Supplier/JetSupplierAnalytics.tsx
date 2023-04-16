import React, { useEffect, useState } from 'react'
import JetDataTable from '../../DataTable/JetDataTable'
import { Box, Button } from '@mui/material'
import style from './JetSupplier.module.css';
import JetBarChart from '../../Charts/JetBarChart';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getSupplierAnalytic } from '../../../store/slices/userSlice';
import * as userSelectors from '../../../store/selectors/userSelectors';
import {Leaderboard} from '@mui/icons-material';
import JetSpinner from '../../common/JetSpinner';
import { flexCenter } from '../../../themes/commonStyles';
import { IBarChartData } from '../../../models/analytic';
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
  const dispatch = useAppDispatch();
  const supplierId = useAppSelector(userSelectors.supplierId);
  const getLoader = useAppSelector(userSelectors.loader);
  const supplierAnalytic = useAppSelector(userSelectors.supplierAnalytic);
  const [barChart, setBarChart] = useState<boolean>(false);
  const [barChartData, setBarChartData] = useState<IBarChartData[]>([]);

  const getAnalytic = async () => {
    if(!!supplierId) {
      try {
        await dispatch(getSupplierAnalytic({supplierId: supplierId}));
      } catch (error) {
        console.error('ERR: getAnalytic()');
      }
    }
  }
  

  const displayBarChart = () => {
    setBarChart(true);
    // Преобразуем полученные данные (supplierAnalytic) к нужному виду и передаем их
    const bcd = [
      {name: 'Баранина', value: 10}, 
      {name: 'Говядина', value: 120}, 
      {name: 'Курица', value: 140}, 
      {name: 'Макароны', value: 160},
      {name: 'Клубника', value: 190},
    ];

    setBarChartData(bcd);
  }

  useEffect(() => {
    //getAnalytic();
  },[])
  return (
    <>
      <Box className={style.titleNotFixed}>Аналитика</Box>
      
      <Box className={style.analyticToolbar}>
        <Button 
          variant='outlined' 
          startIcon={<Leaderboard />} 
          onClick={displayBarChart}
        >
          Динамика продаж
        </Button>
      </Box>

      <JetDataTable rows={mocRows} columns={mocColumns} />

      {barChart && 
        <Box>
          { getLoader && <Box sx={{width:'100%', ...flexCenter, mt: 5}}><JetSpinner size={85} /></Box> }

          { !getLoader && <JetBarChart data={barChartData} /> }         
        </Box>
      }
    </>
  )
}

export default JetSupplierAnalytics