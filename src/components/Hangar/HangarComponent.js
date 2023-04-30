import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row, Table } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { expressURL } from '../../shared/expressURL';
import HeavyTankIcon from '../../images/icons/Heavy_Tank_Icon.png';
import MedTankIcon from '../../images/icons/Medium_Tank_Icon.png';
import LightTankIcon from '../../images/icons/Light_Tank_Icon.png';
import TdTankIcon from '../../images/icons/Tank_Destroyer_Icon.png';
import { Filter } from './Filter.js';
import * as IoIcons from 'react-icons/io';
import { listOfPlayersURL } from '../../shared/wargaming';

const DisplayPlayers = ({ players, dropdown, handleDropdown }) => {
  const [accountID, setAccountID] = useState('');
  if (!players) return;
  if (!players.data?.length) {
    return (
      <div className='no-players'>
        {'No matching results found'}
      </div>
    );
  }
  if (dropdown) {
    return (
      <div className='dropdown-content' style={{display: dropdown ? 'block' : 'none'}}>
        {players.data.slice(0, 10).map((account, index) => {
          return (
            <Button key={index} onClick={() => {
              setAccountID(account.account_id);
              handleDropdown();
            }}>
              {account.nickname}
            </Button>
          )
        })}
      </div>
    );
  }
  else {
    return (
      <Hangar accountID={accountID} />
    );
  }
};

const SearchPlayer = () => {
  const [playerNick, setPlayerNick] = useState('');
  const [players, setPlayers] = useState([]);
  const [dropdown, setDropdown] = useState(true);
  const handleDropdown = () => setDropdown(!dropdown);

  useEffect(() => {
    (async () => {
      const playersAccountID = await fetch(listOfPlayersURL(playerNick)).then((res) => res.json());
      setPlayers(playersAccountID);
    })();
  }, [playerNick])


  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='search-container'>
          {dropdown ? (
            <div className='user-search'>
            <Input type='text' name='search-player' id='input-search-player' placeholder='Search Player' style={{
              border: 0, borderRadius: '12px 0 0 12px', boxShadow: 'none', padding: 15}}
                   value={playerNick} onChange={(event) => setPlayerNick(event.target.value)} />
            <div className='icon-search-user'>
              <IoIcons.IoIosSearch />
            </div>
          </div>
          ) : <div></div>}
        </div>
      </div>
      {playerNick === '' ? <div></div> : <DisplayPlayers players={players} dropdown={dropdown} handleDropdown={handleDropdown}
      /> }
    </div>

  );
};

const Hangar = (props) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [statsForFilter, setStatsForFilter] = useState([]);
  const [statsFromFilter, setStatsFromFilter] = useState([]);
  const [isSortDesc, setSortDesc] = useState(false);
  const [lastSortCol, setLastSortCol] = useState('');

  const sortStats = (stats, col) => {
    if (col === '') {
      setPlayerStats({
        status: 'ok',
        data: stats,
      });
      return;
    }

    const data = stats.sort((tank1, tank2) => {
      if (col === 'name') {
        if (isSortDesc) return tank2[col].localeCompare(tank1[col])
        else return tank1[col].localeCompare(tank2[col])
      } else {
        if (isSortDesc) return tank2[col] - tank1[col]
        else return tank1[col] - tank2[col]
      }
    });

    setPlayerStats({
      status: 'ok',
      data,
    });
  };

  const setFlagsForSort = (col) => {
    setSortDesc(!isSortDesc);
    setLastSortCol(col);
  };

  useEffect(() => {
    if (playerStats.data) sortStats(playerStats.data, lastSortCol, isSortDesc);
  }, [isSortDesc, lastSortCol]);

  useEffect(() => {
    if (statsFromFilter.length) sortStats(statsFromFilter, lastSortCol, isSortDesc);
  }, [statsFromFilter, lastSortCol]);

  useEffect(() => {
    (async () => {
      if (props.accountID === '') return;
      const stats = await fetch(`${expressURL}tanks/${props.accountID}`).then((res) => res.json());

      setPlayerStats(stats);
      setStatsForFilter(stats);
    })();
  }, [props.accountID]);

  if (playerStats.status !== 'ok') {
    return (
      <div className='container'>
        <div className='row'>
          <h2 className='text-center'>{`Oops... Something went wrong.`}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='content'>
      <Row>
        <Col lg={2}>
          <h1 className="ps-3">Hangar</h1>
        </Col>
        <Col>
          <Filter
            setPlayerStats={setPlayerStats}
            statsForFilter={statsForFilter}
            setStatsFromFilter={setStatsFromFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover className="mb-5" responsive>
            <thead>
            <tr>
              <th>
                <Label onClick={() => setFlagsForSort('name')}>Tank</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('tier')}>Tier</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('lastBattleTime')}>Last Battle</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('battles')}>Battles</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('winrate')}>WinRate</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('avgDmg')}>Average Damage</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('coefFrag')}>Frags Rate</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('percentRemainHP')}>Remaining HP</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('battlesForMaster')}>Battles for Master</Label>
              </th>
              <th>
                <Label onClick={() => setFlagsForSort('avgTimeInBattleForSort')}>Average Life Time</Label>
              </th>
            </tr>
            </thead>
            <tbody>
            {[...playerStats.data].map((accountTank) => {
              return (
                <tr key={accountTank.tank_id}>
                  <td>
                    <Link to={`/hangar`}>
                      {accountTank.name ?? accountTank.tank_id}
                    </Link>
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={1}>
                      {accountTank.type === 'heavyTank' ? (
                        <img src={HeavyTankIcon} alt="heavyTank" width="20" height="20" />
                      ) : accountTank.type === 'mediumTank' ? (
                          <img src={MedTankIcon} alt="MediumTank" width="20" height="20" />
                      ) : accountTank.type === 'lightTank' ? (
                          <img src={LightTankIcon} alt="LightTank" width="20" height="20" />
                      ) : accountTank.type === 'AT-SPG' ? (
                        <img src={TdTankIcon} alt="TankDestroyer" width="20" height="20" />
                      ) : undefined}
                      <p className="mb-0">{accountTank.tier}</p>
                      {accountTank.isPremium === true && <StarFill size={1} color="Orange" />}
                    </Stack>
                  </td>
                  <td>{new Date(accountTank.lastBattleTime * 1000).toLocaleDateString()}</td>
                  <td>{accountTank.battles}</td>
                  <td>{`${accountTank.winrate}%`}</td>
                  <td>{accountTank.avgDmg}</td>
                  <td>{accountTank.coefFrag}</td>
                  <td>{accountTank.percentRemainHP[0] === '-' ? '0.00%' : `${accountTank.percentRemainHP}%`}</td>
                  <td>{accountTank.battlesForMaster === 0 ? '-' : accountTank.battlesForMaster}</td>
                  <td>{accountTank.avgTimeInBattle}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default SearchPlayer;
