import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const style = {
    mainDiv: {
        width: 500,
        height: 350,
        margin: "auto",
        marginTop: 60,
        border: "1px solid grey"
    },
    h1: {
        padding: "30px 0 0 20px",
        borderBottom: "1px solid grey"
    },
    innerDiv: {
        width: 400,
        margin: "auto"
    },
    input: {
        width: 300,
        height: 40
    },
    btn: {
        marginTop: 10
    },
    resetPassword: {
        display: "grid",
        gridTemplateColumn: "1fr 1fr"
    }
};

class ForgetPassword extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            disabled: false,
            message: "",
            show: true,
            password: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        console.log("Close ");
        this.setState({ show: false });
    }
    handleOpen() {
        this.setState({ show: true });
    }
    onChangeHandler = e => {
        this.setState({ input: e.target.value });
    };
    onPasswordChangeHandler = e => {
        this.setState({ password: e.target.value });
    };
    savePasswordHandler = () => {
        const resetPasswordDetails = {
            input: this.state.input,
            password: this.state.password
        };
        fetch("resetPassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(resetPasswordDetails)
        });
        this.setState({ show: false });
    };
    submitHandler = async () => {
        console.log("Into method");
        fetch("forgetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(this.state.input)
        })
            .then(response => response.json())
            .then(response => {
                if (response[0]) {
                    this.setState({ message: "User Found", show: true });
                } else {
                    this.setState({
                        message:
                            "User not found!Please enter a valid username or email"
                    });
                }
            });
    };
    render() {
        return (
            <div>
                <div style={style.mainDiv}>
                    <div style={style.innerDiv}>
                        <h1 style={style.h1}>Account Recovery</h1>
                        <h3>Find Your Account</h3>
                        <p>
                            Enter Your username or email linked to your account
                        </p>
                        <div>
                            <input
                                type="text"
                                name="field"
                                style={style.input}
                                onChange={this.onChangeHandler}
                            />
                        </div>
                        <span style={{ color: "red" }}>
                            {this.state.message}
                        </span>
                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                style={style.btn}
                                onClick={this.submitHandler}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={style.resetPassword}>
                            <div>
                                <label>Enter New password</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="password"
                                    onChange={this.onPasswordChangeHandler}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Confirm new password</label>
                            </div>
                            <div>
                                <input type="text" name="confirm-password" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.savePasswordHandler}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ForgetPassword;
