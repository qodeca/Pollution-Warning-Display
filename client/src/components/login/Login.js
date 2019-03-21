import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

class Login extends Component {
    render() {
        return(
            <div className="login">
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <Form>
                                <h5 className="mb-3">Administrator Dashboard Login</h5>
                                <FormGroup>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                                </FormGroup>
                                <Button color="primary">Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
