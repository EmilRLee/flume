import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import IssueList from './IssueList';

function Workspace() {
    return (
        <>
            <div className="workspace">
                <Container>
                    <Row>
                        <Col>
                            <h1>Issues</h1>
                            <IssueList />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Workspace
