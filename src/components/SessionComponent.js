import React, { Component, useState } from "react";
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
import { Loading } from "./LoadingComponent";
import { wargamingUserData }  from "../shared/wargaming";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownValue: "Choose account",
      account_id: null,
      playerInfo: {
        battles: null,
        damage: null,
        wins: null,
      },
    };
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue = async (nickname) => {
    const playerInfo = await this.getPlayerStats(nickname);
    await this.fetchingStats();
    this.setState({
      dropdownValue: nickname,
      account_id: this.getAccountId(nickname),
      playerInfo: { ...playerInfo },
    });
  }


  getAccountId = (nickname) => {
    const userAccounts = this.props.accounts[0].userAccounts;
    return userAccounts.find((account) => account.nickname === nickname).account_id;
  }

  getPlayerStats = async (nickname) => {
    const account_id = this.getAccountId(nickname);
    const res = await fetch(wargamingUserData(account_id))
      .then((res) => res.json())
    const playerStats = res.data[account_id]?.statistics;
    const playerBattles = playerStats?.all.battles + playerStats?.rating.battles;
    const playerDamage = playerStats?.all.damage_dealt + playerStats?.rating.damage_dealt;
    const playerWins = playerStats?.all.wins + playerStats?.rating.wins

    return {
      battles: playerBattles,
      damage: playerDamage,         // body: JSON.stringify(playerInfo)
      wins: playerWins,
    };
  }

  fetchingStats = () => {
    setTimeout(async () => {
      const { battles, damage, wins } = await this.getPlayerStats(this.state.dropdownValue);
      const currBattles = battles - this.state.playerInfo.battles;
      const currDamage = ((damage - this.state.playerInfo.damage) / currBattles).toFixed(0);
      const currWinRate = (((wins - this.state.playerInfo.wins) / currBattles) * 100).toFixed(2);

      this.fetchingStats();
      this.props.handleSessionStats({currBattles, currDamage, currWinRate});
    }, 5000)
  }

  render() {
    if (!this.props.accounts[0]) return <div></div>
    return (
      <div className="dropdown">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
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
  const [sessionStats, setSessionStats] = useState({});
  const handleSessionStats = (stats) => setSessionStats(stats);

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

  if (!props.accounts[0]) return <div><h3 style={{textAlign: "center"}}>Add Account in tab Accounts</h3></div>
  const widgetSettings = props.settings[0];
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
          <Dropdown accounts={props.accounts}
                    handleSessionStats={handleSessionStats}
          />
          <Link to="/session/configure-widget" className="primary-button">Configure Widget</Link>
        </div>
        <div className="user-information" style={{
          flexDirection: widgetSettings.alignment,
          backgroundColor: widgetSettings.backgroundColor,
          color: widgetSettings.textColor,
          fontSize: widgetSettings.fontSize + 'px'
        }}>
          <div className="battles">
            <span style={{fontFamily: widgetSettings.fontFamily}}>{widgetSettings.battleText}: {sessionStats.currBattles}</span>
          </div>
          <div className="damage">
            <span style={{fontFamily: widgetSettings.fontFamily}}>{widgetSettings.damageText}: {sessionStats.currDamage}</span>
          </div>
          <div className="winrate">
            <span style={{fontFamily: widgetSettings.fontFamily}}>{widgetSettings.winrateText}: {sessionStats.currWinRate}%</span>
          </div>
        </div>
        <div className="reset-button">
          <Button className="primary-button" onClick={() => console.log(this.changeValue)}>Reset Stats</Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
