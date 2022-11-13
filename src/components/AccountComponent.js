import React from "react";
import { Loading } from "./LoadingComponent";

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

  if (!props.accounts[0]) return <div></div>

  return (
    <div className="content">
      <div className="profile-container">
        <div className="table">
          <div className="headerAccount">
            <h2>Linked Account WoT Blitz</h2>
            <div className="server">
              <button className="primary-button add-account icon"><span>Add Account</span></button>
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
              <tbody>
              {props.accounts[0].userAccounts.map((account, index) => {
                return (
                  <tr key={index}>
                    <td>{account.nickname}</td>
                    <td>eu</td>
                    <td>
                      delete icon
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
