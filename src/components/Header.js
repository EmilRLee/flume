import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import fakeimage from '../assets/images/fake3.jpeg';
import { FaBell } from 'react-icons/fa';
import UserMenu from './UserMenu';
const axios = require('axios').default;


export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: []
        }
    }


    async componentDidMount(){

        await axios.get(`http://localhost:3001/api/user/${sessionStorage.getItem("user")}`)
            .then((res) =>{
                this.setState({
                    user: res.data,
                    alertcount: res.data.alerts.length
                });
                //console.log(this.state)
                //console.log(this.state.data.alerts.length);
            })
        
    }


    render() {

        
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
                                <FaBell className="reminder-icon" size={25}/>
                            </div>
                            <div className="reminder-count">{this.state.alertcount}</div>
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
                </div>
            </div>
        )
    }
}
