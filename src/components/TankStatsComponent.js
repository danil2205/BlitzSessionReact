import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Stack } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

const TankStats = (props) => {
  const { accountId, wotId } = useParams();
  const navigate = useNavigate();
  const tankStats = props.tanksStats.data.find((tank) => tank.tank_id === Number(wotId));

  return (
    <div className='content'>
      <Row>
        <Col>
          <Stack direction="horizontal">
            <Button onClick={() => navigate(`/hangar/${accountId}`) } variant="link">
              <ArrowLeftCircle size={35} />
            </Button>
            <h1 className="ms-3">
              {tankStats.name}
            </h1>
          </Stack>
        </Col>
        {/*<Col>*/}
          {/*<Filter hideTankFilters hideBattlesCountLimit />*/}
        {/*</Col>*/}
      </Row>
    </div>
  );
};

export default TankStats;
