import React, { useEffect, useMemo, useState } from 'react'
import { IColumnTable, IRowTable } from '../../models/analytic'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material'
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
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const calculateTotalValue = (name: valuesForCalculating) => {
        return allRows.reduce((accumulator, currentValue) => accumulator + currentValue[name], 0);
    }

    const totalProductsSalesCount = useMemo(() => calculateTotalValue('productSalesCount'), [allRows]);
    const totalProductsProfit = useMemo(() => calculateTotalValue('productProfit'), [allRows]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


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
        a: { [key in Key]: number | string | Moment },
        b: { [key in Key]: number | string | Moment },
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
                                            <TableSortLabel sx={{
                                                color: '#FFF!important',
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
                                (
                                    rowsPerPage > 0
                                    ?
                                    allRows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    :
                                    allRows.sort(getComparator(order, orderBy)).slice()
                                )
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

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Количество строк в таблице:'
                labelDisplayedRows={
                    ({ from, to, count }) => {
                      return '' + from + '-' + to + ' из ' + count
                    }
                }
            />

            <Box sx={{ mt: 1, mb:3,  ...flexBetweenCenter }}>
                <Box>Всего товаров: {allRows.length}</Box>
                <Box>Общее число продаж: {totalProductsSalesCount}</Box>
                <Box>Суммарная выручка: {totalProductsProfit}</Box>
            </Box>
        </>
    )
}

export default JetDataTable