import React, { Component } from "react";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Email: "",
      Password: "",
    };

    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);
    this.Name = this.Name.bind(this);
    this.register = this.register.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }

  Password(event) {
    this.setState({ Password: event.target.value });
  }

  Name(event) {
    this.setState({ Name: event.target.value });
  }

  register(event) {
    fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.Name,
        password: this.state.Password,
        email: this.state.Email,
      }),
    })
      .then((Response) => Response.json())

      .then((Result) => {
        //console.log(Result.status);
        if (Result.status === 200) {
          //      this.props.history.push("/");
          window.location.href = "/";
        } else {
          alert("Sorrrrrry !!!! Un-authenticated User !!!!!");
        }
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                      <div class="col-sm-12 btn btn-primary">Sign Up</div>
                    </div>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Name}
                        required
                        placeholder="Enter Name"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Email}
                        required
                        placeholder="Enter Email"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        onChange={this.Password}
                        required
                        placeholder="Enter Password"
                      />
                    </InputGroup>

                    <Button onClick={this.register} color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Register;
