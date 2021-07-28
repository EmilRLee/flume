import React, { Component } from 'react';
import {Menu,MenuItem} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default class UserMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        }
    }

    handleClick(e){
        this.setState({
            anchorEl: e.currentTarget,
            open: true
        }); 
    };  

    handleClose(){
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <Menu
                    id="user-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                >
                    <MenuItem onClick={() => this.handleClose()}>Profile</MenuItem>
                    <MenuItem onClick={() => this.handleClose()}>My account</MenuItem>
                    <MenuItem onClick={() => this.handleClose()}>
                        <Link to="/logout">Logout</Link>
                    </MenuItem>
                </Menu>
                <ArrowDropDown id="usermenu" className="headermenu" aria-haspopup="true" onClick={(e) => this.handleClick(e)}/>
            </div>
        )
    }
}
