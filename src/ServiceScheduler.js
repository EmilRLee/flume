import React, { Component } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { FaPlusSquare } from 'react-icons/fa';
import Modal from 'react-modal';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";



const localizer = momentLocalizer(moment);


export default class ServiceScheduler extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [null],
            customers: [],
            modalOpen: false,
            start: null,
            end: null,
            title: null,
            customer: null
          };
    }

    async componentDidMount(){
        
        await axios.get(`http://localhost:3001/api/getEvents/${sessionStorage.getItem("organization")}`)
            .then((res) =>{
                this.setState({
                    events: res.data
                })
                return(
                    res.data.map(event => {
                        return(
                            console.log(event)
                        )
                    })
                    
                )
            });
    }

    openModal() {
        this.setState({
            modalOpen: true
        });
        console.log("modal open")
    }
    
    closeModal() {
        this.setState({
            modalOpen: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submitted")
        this.setState({
            modalOpen: false,
        });
        
        axios.get(`http://localhost:3001/api/createEvent/${this.state.title}/${moment(this.state.start).toDate()}/${moment(this.state.end).toDate()}/${sessionStorage.getItem("organization")}/${this.state.customer}`)
            .then((res) => {
                if(res.status === 200){
                    return(
                        console.log("success")
                    )
                } else {
                    console.log("Failed")
                }
            });
    }

    handleSave() {
        axios.get(`http://localhost:3001/api/createEvent/${this.state.title}/${this.state.start}/${this.state.end}/${sessionStorage.getItem("organization")}/${this.state.customer}`)
            .then((res) => {
                if(res.status === 200){
                    return(
                        console.log("success")
                    )
                } else {
                    console.log("Failed")
                }
            });
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    
    
    createEvent() {
        this.setState({
            modalOpen: true
        })
        console.log("event created")
        console.log(this.state)
    }


    render() {

    const customStyles = {
        content: {
            position: 'relative',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '90%',
            width: '90%'
        },
        };
    Modal.setAppElement('#root');

    const customers = this.state.customers.map((customer) => {
        return(
            <option>{customer}</option>
        )
    });

    return (
        
        <div>

            <Header />
            <Sidebar />
            <div className="workspace">
                
                <FaPlusSquare  className="addEvent" size={25} onClick={() => this.createEvent()}/>
                <Calendar
                
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    style={{ height: "100vh",position: "relative",top:"70px" }}
                />
                <Modal
                shouldCloseOnOverlayClick={false}
                isOpen={this.state.modalOpen}
                onRequestClose={() => this.closeModal()}
                style={customStyles}
                contentLabel="Example Modal"
                >
                
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup>
                            <Label for="issueTitle">Title</Label>
                            <Input 
                                type="text" 
                                name="title" 
                                id="issueTitle" 
                                placeholder="Give issue a title" 
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="issueDescription">Start Date</Label>
                            <input type="datetime-local" name="start" selected={this.state.start} onChange={(e) => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="issueDescription">End Date</Label>
                            <input type="datetime-local" selected={this.state.end} onChange={(e) => this.handleChange(e)} name="end"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignees">customer:</Label>
                            <Input type="select" name="customer" id="customers" onChange={(e) => this.handleChange(e)}>
                            <option></option>
                            {customers}
                            </Input> 
                        </FormGroup>
                        <Button onClick={() => this.closeModal()}> Cancel </Button>
                        <Button type="submit"> Create</Button>
                    </Form>
                </Modal>
            </div>
        </div>
        
    );
    }
}

