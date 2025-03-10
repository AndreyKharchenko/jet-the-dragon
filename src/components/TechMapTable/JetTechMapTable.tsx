import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material'
import moment from 'moment';
import { ITechMapTableColumn, ITechMapTableRow } from '../../models/techmap';

interface IDataTable {
    rows: ITechMapTableRow[],
    columns: ITechMapTableColumn[],
}

type Order = 'asc' | 'desc';


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



const JetTechMapTable: React.FC<IDataTable> = ({ rows, columns }) => {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof ITechMapTableRow>('jobCompleteDate');
    let [allRows, setAllRows] = useState(rows);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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
        a: { [key in Key]: number | string  | Date | string[] },
        b: { [key in Key]: number | string  | Date | string[] },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    useEffect(() => {
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
                                .map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            hover
                                            key={row.id}
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <StyledTableCell align="center">{row.jobName}</StyledTableCell>
                                            <StyledTableCell align="center">{row.jobDescription}</StyledTableCell>
                                            <StyledTableCell align="center">{row.jobDuration}</StyledTableCell>
                                            <StyledTableCell align="center">{row.jobDependence.join(', ')}</StyledTableCell>
                                            <StyledTableCell align="center">{row.jobResources}</StyledTableCell>
                                            <StyledTableCell align="center">{moment(row.jobCompleteDate).format('DD.MM.YYYY')}</StyledTableCell>
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
        </>
    )
}

export default JetTechMapTable