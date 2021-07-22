import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class IssueList extends Component {
    render(props) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="issueHead">
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Assignee</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>same shit different day</TableCell>
                                <TableCell align="right">Gage Ferndale</TableCell>
                                <TableCell align="right">In Progress</TableCell>
                                <TableCell align="right">2021</TableCell>
                                <TableCell align="right">emillian</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

