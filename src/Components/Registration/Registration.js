import React from 'react';
import { Grid, Row, Col, Modal, Label, Button, FormGroup, InputGroup, Form, FormControl, Glyphicon, Popover, OverlayTrigger } from "react-bootstrap";
import firebase, { auth } from "../../utils/firebase"

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            registrationSuccess: false,

            email: "",
            ign: "",
            password: "",
            error: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const registeredUser = firebase.database().ref("users/" + result.user.uid);
                const data = {
                    userID: result.user.uid,
                    email: this.state.email,
                    ign: this.state.ign
                };
                registeredUser.push(data);
                console.log("Registration Successful");
                this.setState({ registrationSuccess: true });
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    };

    handleClose() {
        // Modal close function
        this.setState({
            show: false,
            submitted: false
        });
    };

    handleShow() {
        // Modal show function
        this.setState({
            show: true
        });
    };

    render() {
        const { email, password, ign, error } = this.state;
        return (

            <div>
                <Button style={{ marginRight: 5 }} onClick={this.handleShow}>New Account</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    {this.state.registrationSuccess === false ?
                        <Modal.Body>
                            <h1>Registration</h1>
                            {error ?
                                (<div>{error.message}</div>)
                                :
                                null}
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>E-mail:</Label>
                                        <FormControl
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <Label>Password:</Label>
                                        <FormControl
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <Label>In-Game Name:</Label>
                                        <FormControl
                                            type="text"
                                            name="ign"
                                            className="form-control"
                                            placeholder="Mosjoandy"
                                            maxLength="24"
                                            value={ign}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </InputGroup>
                                    <br />

                                    <Button
                                        type="submit"
                                        value="Submit">
                                        Register
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        :
                        <Modal.Body>
                            <h1>Registration</h1>
                            {error ?
                                (<div>{error.message}</div>)
                                :
                                null}
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>E-mail:</Label>
                                        <FormControl
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder={this.state.email}
                                            value={email}
                                            onChange={this.handleChange}
                                            disabled
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <Label>Password:</Label>
                                        <FormControl
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="******"
                                            value={password}
                                            onChange={this.handleChange}
                                            disabled
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <Label>In-Game Name:</Label>
                                        <FormControl
                                            type="text"
                                            name="ign"
                                            className="form-control"
                                            placeholder={this.state.ign}
                                            maxLength="24"
                                            value={ign}
                                            onChange={this.handleChange}
                                            disabled
                                        />
                                    </InputGroup>
                                    <br />

                                    <Button
                                        type="submit"
                                        value="Submit"
                                        disabled>
                                        Register
                                    </Button>
                                    <p>Registration Successful!</p>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    }
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
};

export default Registration