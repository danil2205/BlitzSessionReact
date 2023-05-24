import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import OverviewCard from '../StatisticsCard/Overview';
import Damage from '../StatisticsCard/Damage';
import Wins from '../StatisticsCard/Wins';
import Battles from '../StatisticsCard/Battles';
import BattleStyle from '../StatisticsCard/BattleStyle';
import { Filter } from './Filter';

const TankStats = (props) => {
  const [playerStats, setPlayerStats] = useState(props.tanksStats);
  const [filteredTankStats, setFilteredTankStats] = useState(undefined);
  const { accountId, wotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerStats?.data) return;
    (async () => {
      props.postAccountStats(accountId);
      props.postTankStats(accountId);
    })();
  }, [accountId]);

  const tankStats = props.tanksStats.data ? props.tanksStats.data.find((tank) => tank.tank_id === Number(wotId)) : [];

  return (
    <div className='content'>
      <Row>
        <Col>
          <Stack direction='horizontal'>
            <Button onClick={() => navigate(`/hangar/${accountId}`) } variant="link">
              <ArrowLeftCircle size={35} />
            </Button>
            <h1 className='ms-3'>
              {tankStats?.name}
            </h1>
          </Stack>
        </Col>
        <Col>
          {tankStats?.name && <Filter tankStatsCard={tankStats} setFilteredTankStats={setFilteredTankStats} />}
        </Col>
      </Row>
      {tankStats?.name && filteredTankStats && props.serverStats && props.accountStats &&
      <Row>
        <Col className='statistics-column'>
          <OverviewCard tankStatsCard={tankStats}
                        filteredStats={filteredTankStats}
                        serverStats={props.serverStats} />
          <Damage tankStatsCard={tankStats}
                  filteredStats={filteredTankStats}
                  serverStats={props.serverStats} />
        </Col>

        <Col className="statistics-column">
          <Wins tankStatsCard={tankStats}
                filteredStats={filteredTankStats}
                serverStats={props.serverStats} />
          <Battles tankStatsCard={tankStats}
                   filteredStats={filteredTankStats}
                   serverStats={props.serverStats}
                   creationDate={props.accountStats.data.createdAt}/>
        </Col>

        <Col className="statistics-column">
          <BattleStyle tankStatsCard={tankStats}
                       filteredStats={filteredTankStats}
                       serverStats={props.serverStats} />
        </Col>
      </Row>
      }
    </div>
  );
};

export default TankStats;
