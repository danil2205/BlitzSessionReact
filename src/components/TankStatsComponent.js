import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import OverviewCard from './StatisticsCard/Overview';
import Damage from './StatisticsCard/Damage';
import Wins from './StatisticsCard/Wins';
import Battles from './StatisticsCard/Battles';
import { Filter } from './Hangar/Filter';
import { expressURL } from '../shared/expressURL';
import BattleStyle from './StatisticsCard/BattleStyle';

const TankStats = (props) => {
  const [playerStats, setPlayerStats] = useState(props.tanksStats);
  const { accountId, wotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerStats?.data) return;
    (async () => {
      const stats = await fetch(`${expressURL}tanks/${accountId}`).then((res) => res.json());
      props.setTanksStatsData(stats);
      setPlayerStats(stats);
    })();
  }, [accountId]);

  const tankStats = playerStats.data ? playerStats.data.find((tank) => tank.tank_id === Number(wotId)) : [];

  return (
    <div className='content'>
      <Row>
        <Col>
          <Stack direction='horizontal'>
            <Button onClick={() => navigate(`/hangar/${accountId}`) } variant="link">
              <ArrowLeftCircle size={35} />
            </Button>
            <h1 className='ms-3'>
              {tankStats.name}
            </h1>
          </Stack>
        </Col>
        <Col>
          <Filter />
        </Col>
      </Row>

      <Row>
        <Col className='statistics-column'>
          <OverviewCard tankStats={tankStats} />
          <Damage />
        </Col>

        <Col className="statistics-column">
          <Wins />
          <Battles />
        </Col>

        <Col className="statistics-column">
          <BattleStyle />
        </Col>
      </Row>
    </div>
  );
};

export default TankStats;
