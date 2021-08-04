import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import fakeimage from '../assets/images/fake3.jpeg';
import { FaBell } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { Popover } from '@material-ui/core';
const axios = require('axios').default;


export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: [],
            anchorEl: null,
            open: false
        }
    }


    async componentDidMount(){

        await axios.get(`http://localhost:3001/user/${sessionStorage.getItem("user")}`)
            .then((res) =>{
                this.setState({
                    user: res.data,
                    alertcount: res.data.alerts.length
                });
                //console.log(this.state)
                //console.log(this.state.data.alerts.length);
            })
        
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

       let reminderCount = this.state.alertcount ? <div className="reminder-count"></div> : false ;
        let title = (this.state.user.isAdmin === true) ? "Admin" : "user";
        //let username = this.data.username;
        
        //console.log(this.props.data[0])
        return (
            <div>
                <div className="app-header">
                    <Row>
                        <Col className="header-search">
                            <h2>{sessionStorage.getItem("organization")}</h2>
                        </Col>
                        <Col  className="header-vip">
                            <div className="header-reminder">
                                <FaBell className="reminder-icon" size={25} onClick={(e) => this.handleClick(e)}/>
                            </div>
                            {reminderCount}
                            <div className="header-messages">

                            </div>
                            <div className="header-user">
                                <p className="header-username">{this.state.user.fname}</p>
                                <p className="header-user-title">{title}</p>
                                <img src={fakeimage} className="header-user-image" />
                                <UserMenu />
                            </div>
                        </Col>
                    </Row>
                    <Popover 
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                        >
                        No Alerts
                    </Popover>
                </div>
            </div>
        )
    }
}
