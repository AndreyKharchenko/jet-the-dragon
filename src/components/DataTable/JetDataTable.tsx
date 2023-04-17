import React, { useEffect, useMemo, useState } from 'react'
import { IColumnTable, IRowTable } from '../../models/analytic'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material'
import { Moment } from 'moment';
import { dFlex, flexBetweenCenter } from '../../themes/commonStyles';

interface IDataTable {
    rows: IRowTable[],
    columns: IColumnTable[],
}

type Order = 'asc' | 'desc';

type valuesForCalculating = 'productSalesCount' | 'productProfit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: '#FFF',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const JetDataTable: React.FC<IDataTable> = ({ rows, columns }) => {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IRowTable>('productSalesCount');
    let [allRows, setAllRows] = useState(rows);

    const calculateTotalValue = (name: valuesForCalculating) => {
        return allRows.reduce((accumulator, currentValue) => accumulator + currentValue[name],0);
    }

    const totalProductsSalesCount = useMemo(() => calculateTotalValue('productSalesCount'), [allRows]);
    const totalProductsProfit = useMemo(() => calculateTotalValue('productProfit'), [allRows]);

    
    

    const handleRequestSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }
    
    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string | Moment},
        b: { [key in Key]: number | string | Moment},
    ) => number {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }

    useEffect(() => {
        console.log('rows', rows);
        setAllRows(rows);
    }, [rows])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} size="small">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column) => {
                                    return (
                                        column.id !== 'id' &&

                                        <StyledTableCell
                                            key={column.id}
                                            align='center'
                                            sortDirection={orderBy === column.id ? order : false}
                                            padding={column.disablePadding ? 'none' : 'normal'}
                                        >
                                            <TableSortLabel sx={{ color: '#FFF!important',
                                                    '&:hover': {
                                                        color: '#FFF'
                                                    },
                                                    '&:focus': {
                                                        color: '#FFF'
                                                    },
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#FFF !important',
                                                    },
                                                }}
                                                active={orderBy === column.id}
                                                direction={orderBy === column.id ? order : 'asc'}
                                                onClick={() => handleRequestSort(column.id)}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            allRows
                            .sort(getComparator(order,orderBy))
                            .slice()
                            .map((row) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        key={row.id}
                                        role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <StyledTableCell align="center">{row.productName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.productSalesCount}</StyledTableCell>
                                        <StyledTableCell align="center">{row.productProfit}</StyledTableCell>
                                    </StyledTableRow >
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{mt:3, ...flexBetweenCenter}}>
                <Box sx={{mb:1}}>Всего товаров: {allRows.length}</Box>
                <Box sx={{mb:1}}>Общее число продаж: {totalProductsSalesCount}</Box>
                <Box>Суммарная выручка: {totalProductsProfit}</Box>
            </Box>
        </>
    )
}

export default JetDataTable