import React, {Component, useState} from "react";
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

const authorizationButton = (toggleLoginModal, toggleSignupModal, tokenInfo, auth) => {
  if (tokenInfo.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  const authSuccess = auth.user ? auth.user.success : tokenInfo.jwttoken.success;
  if (!authSuccess) {
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
        <span className="username-text-logout">
          {auth.user ? auth.user.username : tokenInfo.jwttoken.user?.username} <IoIcons.IoMdPerson />
        </span>
        <Button className="logout-button" outline onClick={() => { localStorage.clear();  } }>
          Logout<span className="fa fa-sign-out fa-lg"></span>
        </Button>
      </div>
    );
  }
};

const RenderForms = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdReg, setPwdReg] = useState('');
  const toggleLogin = () => setLoginModal(!loginModal);
  const toggleSignup = () => setSignupModal(!signupModal);
  const handleChangePwd = (event) => { setPwd(event.target.value); };
  const handleChangePwdReg = (event) => { setPwdReg(event.target.value); };

  const handleSubmit = (values) => {
    props.loginUser(values);
    toggleLogin();
  }

  const handleRegistration = (values) => {
    props.signupUser(values);
    toggleSignup();
  }

  if (props.tokenInfo.jwttoken.success && window.location.search) {
    props.postAccount();
    window.history.pushState('', '', window.location.origin + '/accounts');
  }

  return (
    <>
      <Nav className="ml-auto" navbar>
        <NavItem>
          {authorizationButton(toggleLogin, toggleSignup, props.tokenInfo, props.auth)}
        </NavItem>
      </Nav>
      <Modal isOpen={loginModal} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <LocalForm model="login" onSubmit={(values) => handleSubmit(values)}>

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
                <Control type="password" value={pwd} onChange={handleChangePwd} model=".password" id="password"
                         name="password"
                         placeholder="Your Password"
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

      <Modal isOpen={signupModal} toggle={toggleSignup}>
        <ModalHeader toggle={toggleSignup}>Register</ModalHeader>
        <ModalBody>
          <LocalForm model="register" onSubmit={(values) => handleRegistration(values)}>
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
                <Control type="password" value={pwdReg} onChange={handleChangePwdReg} model=".password" id="password"
                         name="password"
                         placeholder="Your Password"
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
      <RenderForms loginUser={props.loginUser}
                   signupUser={props.signupUser}
                   auth={props.auth}
                   tokenInfo={props.tokenInfo}
                   postAccount={props.postAccount}
      />
    </>
  );
}

export default Navbar;
