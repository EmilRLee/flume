import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Workspace from './components/Workspace';
//import IssueList from './components/IssueList';


export default class Main extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {};
    }

    render() {
        if(sessionStorage.getItem("user")){
            return (
                <div>
                    <Header />
                    <Sidebar />
                    <Workspace />
                </div>
            )
        } else{
            return(
                <div>
                    <h1>MUST BE LOGGED IN</h1>
                    <p>http://localhost:3000/login</p>
                </div>
            )
        }
    }
}

