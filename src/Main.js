import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Workspace from './components/Workspace';
//import IssueList from './components/IssueList';
const axios = require('axios').default;

export default class Main extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = [];
    }

    render() {
        return (
            <div>
                <Header data={this.state}/>
                <Sidebar />
                <Workspace />
                
            </div>
        )
    }

    componentDidMount(){
   
        const Data = []

    axios('http://localhost:3001/api/users')
        .then((res) => {
            this.setState(res.data[0]);
            
            //console.log(res.data[0].username);
        });
    
    }
};

