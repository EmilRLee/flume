import React, {Component} from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import IssueList from './IssueList';
import {FaPlusSquare} from 'react-icons/fa';
import Modal from 'react-modal';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Snackbar } from '@material-ui/core';
import axios from 'axios';


export default class Workspace extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            showSnackbar: false,
            message: null,
            titleData: null,
            descData: null,
            statusData: null,
            assignees: [

            ]
        }
    }

    async componentDidMount(){
        
        await axios.get(`http://localhost:3001/api/getAssignees/${sessionStorage.getItem("organization")}`)
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
            message: `Issue "${this.state.titleData}" has been created `
        });
        
        axios.get(`http://localhost:3001/api/createIssue/${this.state.titleData}/${this.state.statusData}/${this.state.descData}`)
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

    render() {
        const assignees = this.state.assignees.map((assignee) => {
            return(
                <option>{assignee}</option>
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
                            <FaPlusSquare size={25} onClick={() => this.openModal()}/>Create Issue
                            <IssueList />
                        </Col>
                    </Row>
                </Container>
                <Snackbar 
                    open={this.state.showSnackbar}
                    autoHideDuration={6000}
                    onClose={() => this.closeSnackbar()}
                    message={this.state.message}
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
                            <Input type="textarea" name="description" id="issueDescription" placeholder="description of issue"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="issuestatus">Status</Label>
                            <Input type="select" name="status" id="issuestatus">
                            <option>Open</option>
                            <option>Closed</option>
                            <option>In Progress</option>
                            <option>Investigating</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignees">Assign to:</Label>
                            <Input type="select" name="assignees" id="assignees">
                            {assignees}
                            <option>nunya</option>
                            </Input>
                            
                        </FormGroup>
                        <Button onClick={() => this.closeModal()}> Cancel </Button>
                        <Button type="submit"> Create</Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}


