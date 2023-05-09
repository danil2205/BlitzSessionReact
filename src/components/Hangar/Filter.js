import React, { useState } from 'react';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import HeavyTankIcon from '../../images/icons/Heavy_Tank_Icon.png';
import MedTankIcon from '../../images/icons/Medium_Tank_Icon.png';
import LightTankIcon from '../../images/icons/Light_Tank_Icon.png';
import TdTankIcon from '../../images/icons/Tank_Destroyer_Icon.png';

export const Filter = (props) => {
  const [filterValues, setFilterValues] = useState({});

  const filterStats = (filterValues) => {
    const filteredStats = props.statsForFilter.data.filter((tankStats) =>
      (filterValues?.battles ?? 0) < tankStats.battles &&
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

  return (
    <div className='filter-container'>
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

