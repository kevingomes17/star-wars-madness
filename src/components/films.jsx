import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import { gridHeader, sortGridRows, transformDataForGridView } from '../helpers/films.data-helpers';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const defaultSortDirection = 'asc';
const gridHeaderData = gridHeader();

function Films() {
    const classes = useStyles();
    const [orderByHeaderCellId, setOrderByHeaderCellId] = useState('title');
    const [currentColSortDirection, setCurrentColSortDirection] = useState('asc');
    const [gridRows, setGridRows] = useState([]);
    const { isLoading, error, data } = useQuery('filmsData', () => {
        return fetch('https://swapi.dev/api/films/').then(res => {
            const promise = res.json();
            return promise.then((resData) => {
                setGridRows(transformDataForGridView(resData.results));
                return resData;
            });
        });
    });

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

    const createDataSortHandler = (headerCell) => (event) => {
        const isAsc = orderByHeaderCellId === headerCell.id && currentColSortDirection === 'asc';
        const sortDirection = isAsc ? 'desc' : 'asc';
        sortGridRows(gridRows, headerCell.id, headerCell.isNumeric, headerCell.isDate, sortDirection);
        setCurrentColSortDirection(sortDirection);
        setOrderByHeaderCellId(headerCell.id);
        setGridRows(gridRows);
    };

    return (
        <div className="Films">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="Films data in a grid">
                    <TableHead>
                        <TableRow>
                            {gridHeaderData.map((headerCell) => {
                                return (
                                    <TableCell
                                        key={headerCell.id}
                                        align={headerCell.isNumeric ? 'right' : 'left'}
                                        sortDirection={orderByHeaderCellId === headerCell.id ? currentColSortDirection : false}>
                                        <TableSortLabel
                                            active={orderByHeaderCellId === headerCell.id}
                                            direction={orderByHeaderCellId === headerCell.id ? currentColSortDirection : defaultSortDirection}
                                            onClick={createDataSortHandler(headerCell)}
                                        >
                                            {headerCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gridRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.releaseDate}</TableCell>
                                <TableCell align="left">{row.director}</TableCell>
                                <TableCell align="right">{row.episodeId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Films;