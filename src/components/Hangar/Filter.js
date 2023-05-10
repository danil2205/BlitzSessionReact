import React, { useState } from 'react';
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

  const filterStats = (filterValues) => {
    const filteredStats = props.statsForFilter.data.filter((tankStats) =>
      filterValues.battles < tankStats.battles &&
      (!filterValues.tier?.length || filterValues.tier.includes(tankStats?.tier)) &&
      (!filterValues.type?.length || filterValues.type.includes(tankStats?.type))
    );
    if (filteredStats.length && filterValues) props.setStatsFromFilter(filteredStats);
    else {
      props.setPlayerStats({
        status: 'ok',
        data: [],
      });
    }
  };

  const filterAccStats = (filterValues) => {
    const afterTimeRangeSnapshots = props.accountStats.data.snapshots.filter((accountStats) => (
      timeRange[filterValues.timeRange] < accountStats.lastBattleTime*1000
    ));
    const beforeTimeRangeIndex = props.accountStats.data.snapshots.length !== afterTimeRangeSnapshots.length ?
      props.accountStats.data.snapshots.indexOf(afterTimeRangeSnapshots[0]) - 1 :
      null;
    if (beforeTimeRangeIndex == null) return;
    const beforeTimeRangeSnapshot = props.accountStats.data.snapshots[beforeTimeRangeIndex];
    const filteredSnapshot = afterTimeRangeSnapshots.at(-1);

    const diff = Object.keys(filteredSnapshot.regular).reduce((acc, key) => {
      acc.regular[key] = filteredSnapshot.regular[key] - beforeTimeRangeSnapshot.regular[key];
      return acc;
    }, { regular: {}, rating: {} });
    diff.rating.battles = filteredSnapshot.rating.battles - beforeTimeRangeSnapshot.rating.battles;

    props.setFilteredAccountStats(diff);
  };

  return (
    <div className='filter-container'>
      { (
        <div>
          <Form.Select onChange={(event) => {
            const data = { ...filterValues, timeRange: event.target.value };
            setFilterValues(data);
            if (props.accountStats) filterAccStats(data);
            if (props.statsForFilter) filterStats(data);
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

      <div>
        <Form.Select onChange={(event) => {
          const data = { ...filterValues, battles: +event.target.value };
          setFilterValues(data);
          filterStats(data);
        }}>
          <option value="0">All Battles</option>
          <option value="100">>100 Battles</option>
          <option value="250">>250 Battles</option>
        </Form.Select>
      </div>

      <div>
        <ToggleButtonGroup type="checkbox" onChange={(event) => {
          const data = { ...filterValues, tier: event };
          setFilterValues(data);
          filterStats(data);
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
      </div>

      <div>
        <ToggleButtonGroup type="checkbox" onChange={(event) => {
          const data = { ...filterValues, type: event };
          setFilterValues(data);
          filterStats(data);
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
      </div>
    </div>
  );
};

