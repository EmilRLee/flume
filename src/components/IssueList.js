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
        this.state = {
            data: [
                
            ]
        }
    }

    async componentDidMount(){
        await axios.get('http://localhost:3001/api/issues')
            .then((res) =>{
                this.setState({
                    data: res.data
                });
                //this.state.data.map(issue => console.log(issue))
                //console.log(this.state);
            })
    }

    

    render() {

        const issues = this.state.data.map(issue => {
            //console.log(issue.description)
            return (
                <TableRow key={issue._id}>
                    <TableCell align="left">{issue.description}</TableCell>
                    <TableCell align="center"><FaComments size={25} /></TableCell>
                    <TableCell align="center">{issue.status}</TableCell>
                    <TableCell align="center">{issue.createdAt}</TableCell>
                    <TableCell align="center">{issue.assignee}</TableCell>
                    <TableCell align="right">{issue._id}</TableCell>
                </TableRow>
            )
        });
        
        
        

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="issueHead">
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Conversations</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date Created</TableCell>
                                <TableCell align="right">Assignees</TableCell>
                                <TableCell>Issue ID</TableCell>
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

