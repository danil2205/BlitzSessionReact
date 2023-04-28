import React, { useEffect, useState } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { expressURL } from '../../shared/expressURL';
import HeavyTankIcon from '../../images/icons/Heavy_Tank_Icon.png';
import MedTankIcon from '../../images/icons/Medium_Tank_Icon.png';
import LightTankIcon from '../../images/icons/Light_Tank_Icon.png';
import TdTankIcon from '../../images/icons/Tank_Destroyer_Icon.png';
import { Filter } from './Filter.js';

const Hangar = (props) => {
  const account_id = 594859325;
  const [playerStats, setPlayerStats] = useState([]);
  const [statsForFilter, setStatsForFilter] = useState([]);
  const [isSortDesc, setSortDesc] = useState(false);

  const sortStats = (col) => {
    const data = playerStats.data.sort((tank1, tank2) => {
      setSortDesc(!isSortDesc);
      if (isSortDesc) return tank2[col] - tank1[col]
      else return tank1[col] - tank2[col]
    });
    setPlayerStats({
      status: 'ok',
      data,
    });
  };

  useEffect(() => {
    (async () => {
      const stats = await fetch(`${expressURL}tanks/${account_id}`).then((res) => res.json());
      setPlayerStats(stats);
      setStatsForFilter(stats);
    })();
  }, []);

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
          <Filter setPlayerStats={setPlayerStats} statsForFilter={statsForFilter}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover className="mb-5" responsive>
            <thead>
            <tr>
              <th>
                <Label onClick={() => {
                  const data = playerStats.data.sort((tank1, tank2) => {
                    setSortDesc(!isSortDesc);
                    if (isSortDesc) return tank2.name.localeCompare(tank1.name)
                    else return tank1.name.localeCompare(tank2.name)
                  });
                  setPlayerStats({
                    status: 'ok',
                    data,
                  });
                }}>Tank</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('tier')}>Tier</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('lastBattleTime')}>Last Battle</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('battles')}>Battles</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('winrate')}>WinRate</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('avgDmg')}>Average Damage</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('coefFrag')}>Frags Rate</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('percentRemainHP')}>Remaining HP</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('battlesForMaster')}>Battles for Master</Label>
              </th>
              <th>
                <Label onClick={() => sortStats('avgTimeInBattleForSort')}>Average Life Time</Label>
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

export default Hangar;
