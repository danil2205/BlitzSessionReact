import React from "react";
import { Loading } from "./LoadingComponent";
import { AuthURL } from "../shared/wargaming";
import * as AiIcons from "react-icons/ai";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const addAccount = (props) => {
  if (!props.accounts[0]) return <tbody></tbody>
  return (
    <tbody>
      {props.accounts.at(-1).userAccounts.map((account, index) => {
        return (
          <tr key={index}>
            <td>{account.nickname}</td>
            <td>EU</td>
            <td>
              <AiIcons.AiFillDelete onClick={() => props.deleteAccount(account.account_id)} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};


const Accounts = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Accounts</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Accounts</h3>
            <hr />
          </div>
        </div>
        <div className="profile-container">
          <div className="table">
            <div className="headerAccount">
              <h2>Linked Accounts WoT Blitz</h2>
              <div className="server">
                <a href={AuthURL} rel="noreferrer">
                  <button className="primary-button add-account icon"><span>Add Account</span></button>
                </a>
              </div>
            </div>
            <div className="accounts-table-container">
              <table>
                <thead>
                <tr>
                  <th>Account</th>
                  <th>Server</th>
                  <th></th>
                </tr>
                </thead>
                {addAccount(props)}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
