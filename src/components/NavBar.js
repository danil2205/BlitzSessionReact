import React, {Component, useState} from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../shared/SidebarData";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import logo from "../logo/blitz.png";
import "../App.css";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Nav, NavItem} from "reactstrap";


class RenderLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleLogin(event) {
    this.toggleModal();
    alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button className="login-button" outline onClick={this.toggleModal}>
              Login<span className="fa fa-sign-in fa-lg"></span>
            </Button>
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                       innerRef={(input) => this.username = input } />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                       innerRef={(input) => this.password = input } />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="remember" name="remember"
                         innerRef={(input) => this.remember = input }/>
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const Navbar = () => {
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
      <RenderLoginForm />
    </>
  );
}

export default Navbar;
