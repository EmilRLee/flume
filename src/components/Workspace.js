import React, {Component} from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import IssueList from './IssueList';
import {FaPlusSquare} from 'react-icons/fa';
import Modal from 'react-modal';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Snackbar, Drawer } from '@material-ui/core';
import axios from 'axios';
import io from 'socket.io-client';


export default class Workspace extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            showSnackbar: false,
            showChat: false,
            snackMessage: null,
            titleData: null,
            descData: null,
            statusData: null,
            assigneeData: null,
            customerData: null,
            issueData: null,
            chatMessage: null,
            chatRoomName: null,
            chatRoom: null,
            chat: [
                
            ],
            assignees: [

            ],
            customers: [

            ]
        }
        this.socket = io.connect('http://localhost:3001')
    }

    async componentDidMount(){
        
        await axios.get(`http://localhost:3001/getAssignees/${sessionStorage.getItem("organization")}`)
            .then((res) =>{
                this.setState({
                    assignees: res.data.users
                })
                return(
                    res.data.users.map(assignee => {
                        return(
                            console.log(assignee)
                        )
                    })
                    
                )
            });
            await axios.get(`http://localhost:3001/getCustomers/${sessionStorage.getItem("organization")}`)
            .then((res) =>{
                this.setState({
                    customers: res.data.customers
                })
                return(
                    res.data.customers.map(customer => {
                        return(
                            console.log(customer)
                        )
                    })
                    
                )
            });
            await axios.get('http://localhost:3001/issues')
            .then((res) =>{
                this.setState({
                    issueData: res.data
                });
                //this.state.data.map(issue => console.log(issue))
                //console.log(this.state);
            })
            
            //comeback to this
            //this.socket.emit('join', )
            this.socket.on("message", ({name, room, message}) => {
                this.setState({
                    chat: [...this.state.chat, {name, room, message}]
                })
                console.log("got server message")
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
            showSnackbar: true,
            snackmessage: `Issue "${this.state.titleData}" has been created `
        });
        
        axios.get(`http://localhost:3001/createIssue/${this.state.titleData}/${this.state.descData}/${this.state.statusData}/${this.state.customerData}/${this.state.assigneeData}`)
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

    closeSnackbar(){
        this.setState({
            showSnackbar: false
        });
    }

    async renderChat(issueId, issueTitle){
        this.socket.emit('join', issueId)
        await axios.get(`http://localhost:3001/messages/${issueId}`)
            .then((res) =>{
                this.setState({
                    chat: res.data,
                    chatRoom: issueId,
                    chatRoomName: issueTitle
                });
            });
        this.openChat()
    }
    
    updateChat(e){
        e.preventDefault();
        this.socket.emit("newMessage", {name: sessionStorage.getItem("user"), room: this.state.chatRoom, message: this.state.chatMessage})
        console.log({name: sessionStorage.getItem("user"), room: this.state.chatRoom, message: this.state.chatMessage})
    }

    openChat(){
        this.setState({
            showChat: true
        })
    }
    
    closeChat() {
        this.setState({
            showChat: false
        })
    }
    
    messages() {
        return (
            this.state.chat.map(({name, message}) => {
                return(
                    `${name}: ${message}`
                )
            })
        )
       console.log(this.state.chat)
       console.log("WACK ASS SHIT")
    }

    render() {
        const assignees = this.state.assignees.map((assignee) => {
            return(
                <option>{assignee}</option>
            )
        });

        const customers = this.state.customers.map((customer) => {
            return(
                <option>{customer}</option>
            )
        });
            
        
        //const Assignees = console.log(this.state.assignees)

        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };
        Modal.setAppElement('#root');
        return(
            <div className="workspace">
                <Container>
                    <Row>
                        <Col>
                            <h1>Issues</h1>
                            <FaPlusSquare size={25} onClick={() => this.openModal()}/>Create Issue <Button onClick={() => this.openChat()}>open chat</Button>
                            {this.state.issueData ? <IssueList data={this.state.issueData} renderChat={this}/> : false}
                        </Col>
                    </Row>
                </Container>
                <Snackbar 
                    open={this.state.showSnackbar}
                    autoHideDuration={6000}
                    onClose={() => this.closeSnackbar()}
                    message={this.state.snackMessage}
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
                                name="titleData" 
                                id="issueTitle" 
                                placeholder="Give issue a title" 
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="issueDescription">Description</Label>
                            <Input type="textarea" name="descData" id="issueDescription" placeholder="description of issue" onChange={(e) => this.handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="issuestatus">Status</Label>
                            <Input type="select" name="statusData" id="issuestatus" onChange={(e) => this.handleChange(e)}>
                            <option></option>
                            <option>Open</option>
                            <option>Closed</option>
                            <option>In Progress</option>
                            <option>Investigating</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignees">customer:</Label>
                            <Input type="select" name="customerData" id="customers" onChange={(e) => this.handleChange(e)}>
                            <option></option>
                            {customers}
                            </Input> 
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignees">Assign to:</Label>
                            <Input type="select" name="assigneeData" id="assignees" onChange={(e) => this.handleChange(e)}>
                            <option></option>
                            {assignees}
                            </Input> 
                        </FormGroup>
                        <Button onClick={() => this.closeModal()}> Cancel </Button>
                        <Button type="submit"> Create</Button>
                    </Form>
                </Modal>
                <Drawer anchor="bottom" open={this.state.showChat} onClose={() => this.closeChat()} className="issue-convos">
                    <h1>Conversations for {this.state.chatRoomName}</h1>
                    <p>{this.messages()}</p>
                    <Form onSubmit={(e) => this.updateChat(e)}>
                        <FormGroup>
                            <Label for="issueTitle">New message</Label>
                            <Input 
                                type="text" 
                                name="chatMessage" 
                                id="chatMessage" 
                                placeholder="New Message" 
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <Button onClick={() => this.closeChat()}> Cancel </Button>
                        <Button type="submit"> Create</Button>
                    </Form>
                </Drawer>
            </div>
        )
    }
}


