import React, { useEffect, useState } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { ArrowLeftCircle, StarFill } from 'react-bootstrap-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { expressURL } from '../../shared/expressURL';
import HeavyTankIcon from '../../images/icons/Heavy_Tank_Icon.png';
import MedTankIcon from '../../images/icons/Medium_Tank_Icon.png';
import LightTankIcon from '../../images/icons/Light_Tank_Icon.png';
import TdTankIcon from '../../images/icons/Tank_Destroyer_Icon.png';
import { Filter } from './Filter.js';

const Hangar = (props) => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [playerStats, setPlayerStats] = useState(props.tanksStats);
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
      if (props.tanksStats?.data && props.tanksStats?.account_id === accountId) return;
      props.postAccountStats(accountId);
      props.postTankStats(accountId);
      const stats = await fetch(`${expressURL}tanks/${accountId}`).then((res) => res.json());
      setPlayerStats(stats);
      setStatsForFilter(stats);
      props.setTanksStatsData(stats);
    })();
  }, [accountId]);

  if (!playerStats.status) {
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
          <Stack direction="horizontal">
            <Button onClick={() => navigate(`/hangar`) } variant="link">
              <ArrowLeftCircle size={35} />
            </Button>
            <h1 className="ps-3">Hangar</h1>
          </Stack>
        </Col>
        <Col>
          {/*<Filter*/}
          {/*  setPlayerStats={setPlayerStats}*/}
          {/*  statsForFilter={statsForFilter}*/}
          {/*  setStatsFromFilter={setStatsFromFilter}*/}
          {/*/>*/}
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
            {[...playerStats.data].filter((tankStats) => tankStats.name).map((accountTank) => {
              const lastSnapshot = accountTank.snapshots.at(-1);
              const avgTimeInBattle = (
                  Math.floor(lastSnapshot.battleLifeTime / lastSnapshot.regular.battles / 60) < 7
                    ? `${Math.floor(lastSnapshot.battleLifeTime / lastSnapshot.regular.battles / 60)}m ${~~(lastSnapshot.battleLifeTime / lastSnapshot.regular.battles % 60)}s`
                    : '~ 7m'
              );
              return (
                <tr key={accountTank.tank_id}>
                  <td>
                    <Link to={`/hangar/${accountId}/${accountTank.tank_id}`}>
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
                  <td>{new Date(lastSnapshot.lastBattleTime * 1000).toLocaleDateString()}</td>
                  <td>{lastSnapshot.regular.battles}</td>
                  <td>{`${((lastSnapshot.regular.wins / lastSnapshot.regular.battles) * 100).toFixed(2)}%`}</td>
                  <td>{~~(lastSnapshot.regular.damageDealt / lastSnapshot.regular.battles)}</td>
                  <td>{(lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2)}</td>
                  <td>{
                    ((1 - (lastSnapshot.regular.damageReceived / lastSnapshot.regular.battles) / accountTank.hp) * 100).toFixed(2) === '-' ?
                    '0.00%' :
                    `${((1 - (lastSnapshot.regular.damageReceived / lastSnapshot.regular.battles) / accountTank.hp) * 100).toFixed(2)}%`
                  }</td>
                  <td>{~~(lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMastery) === 0 ? '-' : accountTank.battlesForMaster}</td>
                  <td>{avgTimeInBattle}</td>
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
