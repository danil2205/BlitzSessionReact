import React, { Component } from "react";

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccounts: [
        {
          "access_token" : "854babf4c49881a9414f4de17837ca112d68f4e7",
          "nickname" : "Danil2205_",
          "account_id" : 90786440,
          "expires_at" : 1663882534
        },
        {
          "access_token" : "85sa4bf4c49881a9414fdfh5637c6546dfdfgbf7",
          "nickname" : "CbIH_MAMUHOY_PODRYGI",
          "account_id" : 95786440,
          "expires_at" : 2663882534
        },
      ],
    };
  };

  render() {
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
                {this.state.userAccounts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.nickname}</td>
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
  }

};

export default Accounts;
