import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import fakeimage from '../assets/images/fake3.jpeg';
import { FaBell } from 'react-icons/fa';

export default class Header extends Component {
    render(props) {

        let title = (this.props.data.isAdmin === true) ? "admin" : "user";
        //let username = this.data.username;
        //let alertCount =this.props.data['alerts'];
        console.log(this.props.data.username)
        return (
            <div>
                <div className="app-header">
                    <Row>
                        <Col className="header-search">
                            <p>search area</p>
                        </Col>
                        <Col  className="header-vip">
                            <div className="header-reminder">
                                <FaBell className="reminder-icon" size={25}/>
                            </div>
                            <div className="reminder-count">{1}</div>
                            <div className="header-messages">

                            </div>
                            <div className="header-user">
                                <p className="header-username">{this.props.data.username}</p>
                                <p className="header-user-title">{title}</p>
                                <img src={fakeimage} className="header-user-image"></img>
                            </div>
                        </Col>
                    </Row> 
                </div>
            </div>
        )
    }
}
