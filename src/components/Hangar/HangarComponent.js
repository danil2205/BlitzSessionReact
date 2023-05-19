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
  const [statsFromFilter, setStatsFromFilter] = useState([]);
  const [isSortDesc, setSortDesc] = useState(false);
  const [lastSortCol, setLastSortCol] = useState('');

  const calcStats = (tankStats) => {
    const lastSnapshot = tankStats.snapshots.at(-1);

    const winrate = ((lastSnapshot.regular.wins / lastSnapshot.regular.battles) * 100).toFixed(2);
    const avgDmg = ~~(lastSnapshot.regular.damageDealt / lastSnapshot.regular.battles);
    const coefFrag = (lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2);
    const percentRemainHP = ((1 - (lastSnapshot.regular.damageReceived / lastSnapshot.regular.battles) / tankStats.hp) * 100).toFixed(2)
    const battlesForMaster = ~~(lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMastery);
    const avgTimeInBattle = lastSnapshot.battleLifeTime / lastSnapshot.regular.battles;

    return {
      name: tankStats.name,
      tier: tankStats.tier,
      lastBattleTime: lastSnapshot.lastBattleTime,
      battles: lastSnapshot.regular.battles,
      winrate,
      avgDmg,
      coefFrag,
      percentRemainHP,
      battlesForMaster,
      avgTimeInBattle,
    };
  };

  const sortStats = (stats, col) => {
    const filteredBadStats = stats.filter((tank) => tank.name);
    if (col === '') {
      setPlayerStats({
        status: 'ok',
        data: filteredBadStats,
      });
      return;
    }

    const data = filteredBadStats.sort((tank1, tank2) => {
      const tank1Stats = calcStats(tank1);
      const tank2Stats = calcStats(tank2);

      if (col === 'name') {
        if (isSortDesc) return tank2Stats[col].localeCompare(tank1Stats[col])
        else return tank1Stats[col].localeCompare(tank2Stats[col])
      } else {
        if (isSortDesc) return tank2Stats[col] - tank1Stats[col]
        else return tank1Stats[col] - tank2Stats[col]
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
      if (props.tanksStats?.data && props.tanksStats?.account_id === Number(accountId)) return;
      props.postAccountStats(accountId);
      props.postTankStats(accountId);
      const stats = await fetch(`${expressURL}tanks/${accountId}`).then((res) => res.json());
      setPlayerStats(stats);
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
          <Filter setPlayerStats={setPlayerStats}
                  hangarStats={props.tanksStats}
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
                <Label onClick={() => setFlagsForSort('avgTimeInBattle')}>Average Life Time</Label>
              </th>
            </tr>
            </thead>
            <tbody>
            {[...playerStats.data].filter((tankStats) => tankStats.name).map((accountTank) => {
              const stats = calcStats(accountTank);
              const avgTimeInBattle = (
                Math.floor(stats.avgTimeInBattle / 60) < 7
                ? `${Math.floor(stats.avgTimeInBattle / 60)}m ${~~(stats.avgTimeInBattle % 60)}s`
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
                  <td>{new Date(stats.lastBattleTime * 1000).toLocaleDateString()}</td>
                  <td>{stats.battles}</td>
                  <td>{`${isNaN(stats.winrate) ? 0 : stats.winrate }%`}</td>
                  <td>{stats.avgDmg}</td>
                  <td>{isNaN(stats.coefFrag) ? 0 : stats.coefFrag}</td>
                  <td>{
                     stats.percentRemainHP[0] === '-' || isNaN(stats.percentRemainHP) ?
                     '0.00%' :
                      `${stats.percentRemainHP}%`
                   }</td>
                  <td>{stats.battlesForMaster === 0 ? '-' : stats.battlesForMaster }</td>
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
