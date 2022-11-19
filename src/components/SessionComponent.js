import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownValue: "Choose account",
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(nickname) {
    this.setState({
      dropdownValue: nickname,
    });
  }

  render() {
    if (!this.props.accounts[0]) return <div></div>
    return (
      <div className="dropdown">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret className="primary-button">
            {this.state.dropdownValue}
          </DropdownToggle>
          <DropdownMenu>
            {this.props.accounts[0].userAccounts.map((account, index) => {
              return (
                <DropdownItem key={index} onClick={(e) => this.changeValue(e.target.textContent.trim())}>
                  <IoIcons.IoMdPerson /> {account.nickname}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

const Session = (props) => {
  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Session</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Session</h3>
            <hr />
          </div>
        </div>
        <div className="session-buttons">
          <Dropdown accounts={props.accounts} />
          <Link to="/session/configure-widget" className="primary-button">Configure Widget</Link>
        </div>
        <div className="user-information">
          <div className="battles">
            <span>Battles: 0</span>
          </div>
          <div className="damage">
            <span>Damage: 0</span>
          </div>
          <div className="winrate">
            <span>Winrate: 0</span>
          </div>
        </div>
        <div className="reset-button">
          <Button className="primary-button">Reset Stats</Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
