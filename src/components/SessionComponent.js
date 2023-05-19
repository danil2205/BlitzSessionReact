import React, { Component, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import { Loading } from './LoadingComponent.js';
import { InitialWidgetSettings } from '../redux/forms.js';
import { expressURL } from '../shared/expressURL';
import { playerStatsURL } from '../shared/wargaming';

const stopAllTimeouts = () => {
  const timeout = setTimeout(() => {
    for (let id = 1; id <= timeout; id++) window.clearTimeout(id);
  });
};

const Dropdown = (props) => {
  const [nickname, setNickname] = useState('');
  const [dropdown, setDropdown] = useState(false)

  if (!props.accounts[0]) return <div></div>;
  return (
    <div className='dropdown' style={{marginLeft: '40px'}}>
      <ButtonDropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
        <DropdownToggle caret className='primary-button'>{nickname || 'Choose nickname'}
        </DropdownToggle>
        <DropdownMenu>
          {props.accounts[0].userAccounts.map((account, index) => (
            <DropdownItem key={index} onClick={() => {
              setNickname(account.nickname);
              props.setAccountId(account.account_id);
            }}>
              <IoIcons.IoMdPerson /> {account.nickname}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}

const Session = (props) => {
  const [accountId, setAccountId] = useState('');
  const [stats, setStats] = useState('');
  const [sessionStats, setSessionStats] = useState({});

  useEffect(() => {
    return () => {
      stopAllTimeouts();
    }
  }, [])

  useEffect(() => {
    (async () => {
      stopAllTimeouts();
      if (accountId) await getPlayerStats(accountId);
    })()
  }, [accountId, props.accountStats]);

  useEffect(() => {
    if (stats) startPlayerSession();
  }, [stats])

  const getPlayerStats = async (accountId) => {
    const stats = await fetch(`${expressURL}accounts/${accountId}`).then((res) => res.json());
    const lastSnapshot = stats.data.snapshots.at(-1);
    setStats(lastSnapshot);
  };

  const startPlayerSession = () => {
    setInterval(async () => {
      const res = await fetch(playerStatsURL(accountId)).then((res) => res.json());
      const playerStats = res.data[accountId]?.statistics;
      console.log(stats)

      const currBattles = playerStats?.all.battles + playerStats?.rating.battles || 0;
      const currDamage = playerStats?.all.damage_dealt + playerStats?.rating.damage_dealt || 0;
      const currWins = playerStats?.all.wins + playerStats?.rating.wins || 0;

      const oldBattles = stats.regular.battles + stats.rating?.battles || 0;
      const oldDamage = stats.regular.damageDealt + stats.rating?.damageDealt || 0;
      const oldWins = stats.regular.wins + stats.rating?.wins || 0;

      setSessionStats({
        battles: currBattles - oldBattles,
        damage: currDamage - oldDamage,
        wins:  currWins - oldWins,
      });
    }, 10000);
  };

  const getWidgetSettings = () => {
    if (props.settings[0]) return props.settings.at(-1);
    return InitialWidgetSettings;
  };

  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h2 className='text-center'>{'Oops... Something went wrong. Log in before access this tab or refresh page'}</h2>
        </div>
      </div>
    );
  }

  if (!props.accounts[0]) return <div><h3 style={{ textAlign: 'center' }}>Add Account in tab Accounts</h3></div>;
  const widgetSettings = getWidgetSettings();
  return (
    <div className='container'>
      <div className='content'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Session</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Session</h3>
            <hr />
          </div>
        </div>
        <div className='session-buttons'>
          <Dropdown accounts={props.accounts}
                    session={props.session}
                    setAccountId={setAccountId}
          />
          <Link to='/session/configure-widget' className='primary-button'>Configure Widget</Link>
        </div>
        <div className='user-information' style={{
          flexDirection: widgetSettings.alignment,
          backgroundColor: widgetSettings.backgroundColor,
          color: widgetSettings.textColor,
          fontSize: widgetSettings.fontSize + 'px'
        }}>
          <div className='battles'>
            <span style={{ fontFamily: widgetSettings.fontFamily }}>{widgetSettings.battleText}: {sessionStats.battles}</span>
          </div>
          <div className='damage'>
            <span style={{ fontFamily: widgetSettings.fontFamily }}>{widgetSettings.damageText}: {
              isNaN((sessionStats.damage / sessionStats.battles).toFixed(0)) ?
              0 :
              (sessionStats.damage / sessionStats.battles).toFixed(0)
            }</span>
          </div>
          <div className='winrate'>
            <span style={{ fontFamily: widgetSettings.fontFamily }}>{widgetSettings.winrateText}: {
              isNaN(((sessionStats.wins / sessionStats.battles)*100).toFixed(2)) ?
                0 :
                ((sessionStats.wins / sessionStats.battles)*100).toFixed(2)
            }%</span>
          </div>
        </div>
        <div className='reset-button'>
          <Button className='primary-button' onClick={async () => {
            props.postAccountStats(accountId);
            stopAllTimeouts();
            await getPlayerStats(accountId);
          }}>Reset Stats</Button>
        </div>
      </div>
    </div>
  );
}

export default Session;
