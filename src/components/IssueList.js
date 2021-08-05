import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';

export default class IssueList extends Component {

    constructor(props){
        super(props);
        
    }



    

    render() {

        const issues = this.props.data.map(issue => {
            //console.log(issue.description)
            return (
                <TableRow key={issue._id} className="issueListItem">
                    <TableCell align="left">{issue.title}</TableCell>
                    <TableCell align="center">{issue.description}</TableCell>
                    <TableCell align="center"><FaComments size={25} onClick={() => this.props.renderChat.renderChat(issue._id, issue.title)}/></TableCell>
                    <TableCell align="center">{issue.customer}</TableCell>
                    <TableCell align="center">{issue.status}</TableCell>
                    <TableCell align="center">{issue.createdAt}</TableCell>
                    <TableCell align="right">{issue.assignee}</TableCell>
                </TableRow>
            )
        });
        
        
        

        return (
            <div>
                <TableContainer component={Paper} className="issueList">
                    <Table aria-label="simple table">
                        <TableHead className="issueHead">
                            <TableRow>
                            <TableCell align="left">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Conversations</TableCell>
                                <TableCell align="center">Customer</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Date Created</TableCell>
                                <TableCell align="right">Assigned To</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {issues}
                                
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

