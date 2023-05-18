import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import LineChart from '../Charts/LineChart';

const Damage = (props) => {
  const stats = props.accountStats ? props.accountStats.data : props.tankStatsCard;
  const lastSnapshot = stats.snapshots.at(-1);
  const { dataForTables, dataForCharts } = props.filteredStats;

  const damageRatio = (lastSnapshot.regular.damageDealt / lastSnapshot.regular.damageReceived).toFixed(3);
  const damageRatioFiltered = dataForTables?.battles ? (dataForTables.damageDealt / dataForTables.damageReceived).toFixed(3) : '-';

  const avgDamage = (lastSnapshot.regular.damageDealt / lastSnapshot.regular.battles).toFixed(0);
  const avgDamageFiltered = dataForTables?.battles ? (dataForTables.damageDealt / dataForTables.battles).toFixed(0) : '-';

  const avgDamageReceived = (lastSnapshot.regular.damageReceived / lastSnapshot.regular.battles).toFixed(0);
  const avgDamageReceivedFiltered = dataForTables?.battles ? (dataForTables.damageReceived / dataForTables.battles).toFixed(0) : '-';

  const labelsForCharts = Object.keys(dataForCharts).map((key) => key);

  return (
    <Card className="mb-3">
      <CardHeader className="bg-metal">
        <h2>Damage</h2>
      </CardHeader>

      <CardBody>
        <Table bordered hover responsive size='sm' className='table-normal-header'>
          <thead>
          <tr>
            <th></th>
            <th>
              <OverlayTrigger overlay={<Tips>Total value for the account</Tips>}>
                  <span><strong>Total</strong></span>
              </OverlayTrigger>
            </th>
            <th>
              <OverlayTrigger overlay={<Tips>Filtered value for the account</Tips>}>
                <span>Filtered</span>
              </OverlayTrigger>
            </th>
            <th>
              <OverlayTrigger overlay={<Tips>Average value for the whole server</Tips>}>
                <span>Server</span>
              </OverlayTrigger>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><strong>Damage ratio</strong></td>
            <td><strong className="increase-font-size">{damageRatio}</strong></td>
            <td>{damageRatioFiltered}</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Avg. damage</strong></td>
            <td><strong className="increase-font-size">{avgDamage}</strong></td>
            <td>{avgDamageFiltered}</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Avg. damage received</strong></td>
            <td><strong className="increase-font-size">{avgDamageReceived}</strong></td>
            <td>{avgDamageReceivedFiltered}</td>
            <td>5</td>
          </tr>
          {!props.accountStats && <tr>
            <td><strong>Tank HP</strong></td>
            <td><strong className="increase-font-size">{props.tankStatsCard.hp}</strong></td>
            <td>-</td>
            <td>-</td>
          </tr>}
          </tbody>
        </Table>
      </CardBody>

      <CardBody>
          <LineChart
            labels={labelsForCharts}
            datasets={[
              {
                label: 'Damage ratio',
                data: Object.values(dataForCharts).map((stats) => (stats.damageDealt / (stats.damageReceived || 1)).toFixed(3)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ]}
          />
      </CardBody>

      <CardBody>
        <LineChart
          labels={labelsForCharts}
          datasets={[
            {
              label: 'Average damage',
              data: Object.values(dataForCharts).map((stats) => (stats.damageDealt / stats.battles).toFixed(0)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Average received damage',
              data: Object.values(dataForCharts).map((stats) => (stats.damageReceived / stats.battles).toFixed(0)),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export default Damage;
