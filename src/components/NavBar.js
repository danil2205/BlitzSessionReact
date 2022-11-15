import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../shared/SidebarData";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import logo from "../logo/blitz.png";
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, Row } from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import * as IoIcons from "react-icons/io";

const authorizationButton = (toggleModal, tokenInfo) => {
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
      <Button className="login-button" outline onClick={toggleModal}>
        Login<span className="fa fa-sign-in fa-lg"></span>
      </Button>
    );
  } else {
    return (
      <div className="username-logout">
        <span className="username-text-logout">{tokenInfo.jwttoken.user.username} <IoIcons.IoMdPerson /> </span>
        <Button className="logout-button" outline onClick={() => { localStorage.clear(); window.location.reload(); } }>
          Logout<span className="fa fa-sign-in fa-lg"></span>
        </Button>
      </div>

    );
  }
};

class RenderLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    this.props.loginUser(values.username, values.password);
    this.toggleModal()
  }


  render() {
    return (
      <>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {authorizationButton(this.toggleModal, this.props.tokenInfo)}
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm model="login" onSubmit={(values) => this.handleSubmit(values)}>

              <Row className="form-group">
                <Label htmlFor="username" md={12}>Username</Label>
                <Col md={12}>
                  <Control.text model=".username" id="username" name="username" placeholder="Your Username" className="form-control" />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="password" md={12}>Password</Label>
                <Col md={12}>
                  <Control.text model=".password" id="password" name="password" placeholder="Your Password" className="form-control" />
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
                       tokenInfo={props.tokenInfo}
                       // isLoading={props.jwttoken.isLoading}
                       // errMess={props.jwttoken.errMess}
      />
    </>
  );
}

export default Navbar;
