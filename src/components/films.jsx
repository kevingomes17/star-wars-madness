import React, { useState } from 'react';
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

function Films({ data }) {
    const classes = useStyles();
    const [orderByHeaderCellId, setOrderByHeaderCellId] = useState('title');
    const [currentColSortDirection, setCurrentColSortDirection] = useState('asc');

    let rows = [];
    if (data !== undefined && data.results) {
        rows = transformDataForGridView(data.results);
        if (orderByHeaderCellId) {
            const headerCell = gridHeaderData.find(headerRow => {
                return (headerRow.id === orderByHeaderCellId);
            });
            sortGridRows(rows, orderByHeaderCellId, headerCell.isNumeric, headerCell.isDate, currentColSortDirection);
        }
    }

    const createDataSortHandler = (headerCell) => (event) => {
        const isAsc = orderByHeaderCellId === headerCell.id && currentColSortDirection === 'asc';
        const sortDirection = isAsc ? 'desc' : 'asc';
        setCurrentColSortDirection(sortDirection);
        setOrderByHeaderCellId(headerCell.id);
    };

    return (
        <div data-testid="films" className="Films">
            {rows.length > 0 ? (
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
                            {rows.map((row, index) => (
                                <TableRow key={index} data-testid={`record-${index}`}>
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
            ) : ''}
        </div>
    );
}

export default Films;