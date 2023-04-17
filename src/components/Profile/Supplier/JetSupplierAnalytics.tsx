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
import { IBarChartData, IRowTable } from '../../../models/analytic';

const columns = [
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
  const [dtRows, setDtRows] = useState<IRowTable[]>([]);

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
    
    // Получаем данные для графика
    const barChartData = supplierAnalytic.map(it => {
      return {
        name: it.productName,
        value: it.productSalesCount
      }
    })

    console.log('barChartData', barChartData)

    setBarChartData(barChartData);
  }

  useEffect(() => {
    if(!supplierAnalytic.length) {
      getAnalytic();
    }

    // Получаем данные для таблицы
    const rows = supplierAnalytic.map(it => {
      return {
        id: it.productId,
        productName: it.productName,
        productSalesCount: it.productSalesCount,
        productProfit: it.productProfit,
      }
    })
    console.log('ROWS', rows);
    setDtRows(rows);
    
  },[supplierAnalytic])

  
  return (
    <>
      <Box className={style.title}>Аналитика</Box>
      
      { getLoader && <Box sx={{width:'100%', ...flexCenter, mt: 5}}><JetSpinner size={85} /></Box> }

      {!getLoader &&
        <React.Fragment>
          <Box className={style.analyticToolbar}>
            <Button 
              variant='outlined' 
              startIcon={<Leaderboard />} 
              onClick={displayBarChart}
            >
              Динамика продаж
            </Button>
          </Box>

          <JetDataTable rows={dtRows} columns={columns} />

          { barChart && <JetBarChart data={barChartData} /> }

        </React.Fragment>
      }
      
    </>
  )
}

export default JetSupplierAnalytics