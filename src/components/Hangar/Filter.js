import React, { useEffect, useState } from 'react';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import HeavyTankIcon from '../../images/icons/Heavy_Tank_Icon.png';
import MedTankIcon from '../../images/icons/Medium_Tank_Icon.png';
import LightTankIcon from '../../images/icons/Light_Tank_Icon.png';
import TdTankIcon from '../../images/icons/Tank_Destroyer_Icon.png';

const timeRange = {
  '1w': new Date().setDate(new Date().getDate() - 7),
  '2w': new Date().setDate(new Date().getDate() - 14),
  '1m': new Date().setMonth(new Date().getMonth() - 1),
  '3m': new Date().setMonth(new Date().getMonth() - 3),
  '6m': new Date().setMonth(new Date().getMonth() - 6),
  '1y': new Date().setMonth(new Date().getMonth() - 12),
};

export const Filter = (props) => {
  const [filterValues, setFilterValues] = useState({ timeRange: '1w', battles: 0 });
  const [stats, setStats] = useState(props.tanksStatsForCard || props.tankStatsCard)

  useEffect(() => {
    if (stats) setStatsForCards();
  }, [stats, filterValues]);

  useEffect(() => {
    if (props.hangarStats && props.hangarStats.data) {
      const filteredStats = props.hangarStats.data.filter((tankStats) => filterHangarStats(tankStats));
      if (filteredStats.length) props.setStatsFromFilter(filteredStats);
      else props.setPlayerStats({
        status: 'ok',
        data: filteredStats,
      })
    }
  }, [filterValues]);

  const filterHangarStats = (tankStats) => {
    const lastSnapshot = tankStats.snapshots.at(-1)

    const isTierFiltered = filterValues.tier?.length ? filterValues.tier.includes(tankStats.tier) : true;
    const isTypeFiltered = filterValues.type?.length ? filterValues.type.includes(tankStats.type) : true;
    const isBattleFiltered = filterValues.battles ? lastSnapshot.regular.battles > filterValues.battles : true;

    return isTierFiltered && isTypeFiltered && isBattleFiltered;
  };

  const filterTankStats = (tankStats, filterValues) => {
    const isTierFiltered = filterValues.tier?.length ? filterValues.tier.includes(tankStats.tier) : true;
    const isTypeFiltered = filterValues.type?.length ? filterValues.type.includes(tankStats.type) : true;
    const isTimeRangeFiltered = filterValues.timeRange !== 'all' ?
      tankStats.snapshots.map((snapshot) => timeRange[filterValues.timeRange] < snapshot.lastBattleTime * 1000) :
      true;
    return tankStats.snapshots.length > 1 && isTierFiltered && isTypeFiltered && isTimeRangeFiltered;
  };

  const getStatsForDay = (allStats) => {
    const statsForDay = allStats.snapshots.slice(1).map((snapshot, index) => {
      const prevSnapshot = allStats.snapshots[index];
      const regular = Object.fromEntries(
        Object.entries(snapshot.regular)
          .map(([key, value]) => [key, value - prevSnapshot.regular[key]])
      );
      return { ...snapshot, regular };
    }).filter((snapshot) => snapshot != null);

    return statsForDay;
  };

  const getStatsForTable = (snapshots) => {
    const statsForTable = snapshots.reduce((acc, snapshot) => {
      Object.entries(snapshot.regular).map(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    }, {});

    return statsForTable;
  };

  const getStatsForCharts = (snapshots) => {
    const statsForCharts = {};
    snapshots.map((snapshot) => {
      snapshot.lastBattleTime = new Date(snapshot.lastBattleTime * 1000).toLocaleDateString();
      if (!statsForCharts[snapshot.lastBattleTime]) {
        statsForCharts[snapshot.lastBattleTime] = { ...snapshot.regular };
      } else {
        for (const key in snapshot.regular) {
          statsForCharts[snapshot.lastBattleTime][key] += snapshot.regular[key];
        }
      }
    });

    return statsForCharts;
  };

  const setStatsForCards = () => {
    const isTimeRangeSelected = filterValues.timeRange === 'all';
    const statsForCard = stats?.data ? stats.data : new Array(stats);

    const statsForDay = statsForCard
      .filter((tankStats) => filterTankStats(tankStats, filterValues))
      .flatMap((tankStats) => getStatsForDay(tankStats));

    const dataForTables = getStatsForTable(statsForDay);
    const dataForCharts = getStatsForCharts(statsForDay);

    const filteredDate = isTimeRangeSelected ?
        Object.keys(dataForCharts)[0] :
        new Date(timeRange[filterValues.timeRange]).toLocaleDateString();

    if (!stats?.data) {
      props.setFilteredTankStats({ filteredDate, dataForTables, dataForCharts });
    } else {
      props.setFilteredAccountStats({ filteredDate, dataForTables, dataForCharts });
    }
  };

  return (
    <div className='filter-container'>
      {(props.tanksStatsForCard || props.tankStatsCard) && (
        <div>
          <Form.Select onChange={(event) => {
            const data = { ...filterValues, timeRange: event.target.value };
            setFilterValues(data);
          }}>
            <option value="1w">1 week</option>
            <option value="2w">2 weeks</option>
            <option value="1m">1 month</option>
            <option value="3m">3 months</option>
            <option value="6m">6 months</option>
            <option value="1y">1 year</option>
            <option value="all">All</option>
          </Form.Select>
        </div>
      )}

      {!(props.tanksStatsForCard || props.tankStatsCard) && <div>
        <Form.Select onChange={(event) => {
          const data = { ...filterValues, battles: +event.target.value };
          setFilterValues(data);
        }}>
          <option value="0">All Battles</option>
          <option value="100">>100 Battles</option>
          <option value="250">>250 Battles</option>
        </Form.Select>
      </div>
      }

      {!props.tankStatsCard && <div>
        <ToggleButtonGroup type="checkbox" onChange={(event) => {
          const data = { ...filterValues, tier: event };
          setFilterValues(data);
        }}>
          <ToggleButton id="tbg-btn-3" value={3} variant="outline-secondary">
            <span className="filter-tank-tier">{'<'}III</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-4" value={4} variant="outline-secondary">
            <span className="filter-tank-tier">IV</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-5" value={5} variant="outline-secondary">
            <span className="filter-tank-tier"> V</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-6" value={6} variant="outline-secondary">
            <span className="filter-tank-tier">VI</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-7" value={7} variant="outline-secondary">
            <span className="filter-tank-tier">VII</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-8" value={8} variant="outline-secondary">
            <span className="filter-tank-tier">VIII</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-9" value={9} variant="outline-secondary">
            <span className="filter-tank-tier">IX</span>
          </ToggleButton>
          <ToggleButton id="tbg-btn-10" value={10} variant="outline-secondary">
            <span className="filter-tank-tier">X</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>}

      {!props.tankStatsCard && <div>
        <ToggleButtonGroup type="checkbox" onChange={(event) => {
          const data = { ...filterValues, type: event };
          setFilterValues(data);
        }}>
          <ToggleButton id="tbg-btn-at" value={'AT-SPG'} variant="outline-secondary">
            <img src={TdTankIcon} alt="AT-SPG" width="20" height="20" />
          </ToggleButton>
          <ToggleButton id="tbg-btn-lt" value={'lightTank'} variant="outline-secondary">
            <img src={LightTankIcon} alt="lightTank" width="20" height="20" />
          </ToggleButton>
          <ToggleButton id="tbg-btn-mt" value={'mediumTank'} variant="outline-secondary">
            <img src={MedTankIcon} alt="mediumTank" width="20" height="20" />
          </ToggleButton>
          <ToggleButton id="tbg-btn-ht" value={'heavyTank'} variant="outline-secondary">
            <img src={HeavyTankIcon} alt="heavyTank" width="20" height="20" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>}
    </div>
  );
};

