import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../shared/SidebarData";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import logo from "../logo/blitz.png";
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, Row } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import * as IoIcons from "react-icons/io";

const required = (value) => value && value.length;
const maxLength = (length) => (value) => !(value) || (value.length <= length);
const minLength = (length) => (value) => value && (value.length >= length);

const authorizationButton = (toggleLoginModal, toggleSignupModal, tokenInfo) => {
  if (tokenInfo.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (!tokenInfo.jwttoken.success) {
    return (
      <div>
        <Button className="login-button" outline onClick={toggleLoginModal}>
          Login<span className="fa fa-sign-in fa-lg"></span>
        </Button>
        <Button className="signup-button" outline onClick={toggleSignupModal}>
          Sign Up<span className="fa fa-user-plus fa-lg"></span>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="username-logout">
        <span className="username-text-logout">{tokenInfo.jwttoken.user.username} <IoIcons.IoMdPerson /> </span>
        <Button className="logout-button" outline onClick={() => { localStorage.clear(); window.location.reload(); } }>
          Logout<span className="fa fa-sign-out fa-lg"></span>
        </Button>
      </div>
    );
  }
};

class RenderLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: false,
      isSignupModalOpen: false,
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }
  toggleLoginModal() {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    })
  }

  toggleSignupModal() {
    this.setState({
      isSignupModalOpen: !this.state.isSignupModalOpen
    })
  }

  handleSubmit(values) {
    this.props.loginUser(values.username, values.password);
    this.toggleLoginModal();
  }

  handleRegistration(values) {
    this.props.signupUser(values.username, values.password);
    this.toggleSignupModal();
  }

  render() {
    return (
      <>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {authorizationButton(this.toggleLoginModal, this.toggleSignupModal, this.props.tokenInfo)}
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm model="login" onSubmit={(values) => this.handleSubmit(values)}>

              <Row className="form-group">
                <Label htmlFor="username" md={12}>Username</Label>
                <Col md={12}>
                  <Control.text model=".username" id="username" name="username" placeholder="Your Username"
                                className="form-control"
                                validators={{
                                  required, minLength: minLength(6), maxLength: maxLength(20)
                                }} />
                  <Errors
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 5 characters',
                      maxLength: 'Must be 20 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="password" md={12}>Password</Label>
                <Col md={12}>
                  <Control type="password" model=".password" id="password" name="password" placeholder="Your Password"
                           className="form-control"
                           validators={{
                    required, minLength: minLength(3), maxLength: maxLength(20)
                  }} />
                  <Errors
                    className="text-danger"
                    model=".password"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 20 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Label md={12}> </Label>
              </Row>

              <Row className="form-group">
                <Col>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
          <ModalHeader toggle={this.toggleSignupModal}>Register</ModalHeader>
          <ModalBody>
            <LocalForm model="register" onSubmit={(values) => this.handleRegistration(values)}>

              <Row className="form-group">
                <Label htmlFor="username" md={12}>Username</Label>
                <Col md={12}>
                  <Control.text model=".username" id="username" name="username" placeholder="Your Username"
                                className="form-control"
                                validators={{
                    required, minLength: minLength(6), maxLength: maxLength(20)
                  }} />
                  <Errors
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 5 characters',
                      maxLength: 'Must be 20 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="password" md={12}>Password</Label>
                <Col md={12}>
                  <Control type="password" model=".password" id="password" name="password" placeholder="Your Password"
                           className="form-control"
                           validators={{
                    required, minLength: minLength(6), maxLength: maxLength(20)
                  }} />
                  <Errors
                    className="text-danger"
                    model=".password"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 5 characters',
                      maxLength: 'Must be 20 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Label md={12}> </Label>
              </Row>

              <Row className="form-group">
                <Col>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <div className="top-container">
              <div className="logo" tabIndex="0">
                <img src={logo} height="30" width="30" alt="BlitzLogo" className="logo-sidebar"/>
                <h2 className="titleSidebar">Blitz Session</h2>
              </div>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icons}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <RenderLoginForm loginUser={props.loginUser}
                       signupUser={props.signupUser}
                       tokenInfo={props.tokenInfo}
      />
    </>
  );
}

export default Navbar;
