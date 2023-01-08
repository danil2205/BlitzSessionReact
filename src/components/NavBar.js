import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../shared/SidebarData";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import logo from "../logo/blitz.png";
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, Row } from "reactstrap";
import { Control, Errors, Form } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import * as IoIcons from "react-icons/io";

const required = (value) => value && value.length;
const maxLength = (length) => (value) => !(value) || (value.length <= length);
const minLength = (length) => (value) => value && (value.length >= length);

const authorizationButton = (toggleLoginModal, toggleSignupModal, tokenInfo, auth, logoutUser) => {
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
        <Button className="logout-button" outline onClick={logoutUser}>
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
  const toggleLogin = () => {
    setLoginModal(!loginModal);
    props.resetForm('login');
    setPwd('');
  };
  const toggleSignup = () => {
    setSignupModal(!signupModal);
    props.resetForm('register');
    setPwdReg('');
  };

  const handleChangePwd = (event, setAuthField) => { setAuthField(event.target.value); };

  const handleSubmit = (values, authUser, toggleAuth) => {
    authUser(values);
    toggleAuth();
  }

  if (props.tokenInfo.jwttoken?.success && window.location.search) {
    props.postAccount();
    window.history.pushState('', '', window.location.origin + '/accounts');
  }

  return (
    <>
      <Nav className="ml-auto" navbar>
        <NavItem>
          {authorizationButton(toggleLogin, toggleSignup, props.tokenInfo, props.auth, props.logoutUser)}
        </NavItem>
      </Nav>
      <Modal isOpen={loginModal} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <Form model="login" onSubmit={(values) => handleSubmit(values, props.loginUser, toggleLogin)}>

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
                <Control type="password" value={pwd} onChange={(event) => handleChangePwd(event, setPwd)}
                         model=".password"
                         id="password"
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
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={signupModal} toggle={toggleSignup}>
        <ModalHeader toggle={toggleSignup}>Register</ModalHeader>
        <ModalBody>
          <Form model="register" onSubmit={(values) => handleSubmit(values, props.signupUser, toggleSignup)}>
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
                <Control type="password" value={pwdReg} onChange={(event) => handleChangePwd(event, setPwdReg)}
                         model=".password"
                         id="password"
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
          </Form>
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
                   handleLogout={props.handleLogout}
                   logoutUser={props.logoutUser}
                   resetForm={props.resetForm}
      />
    </>
  );
}

export default Navbar;
