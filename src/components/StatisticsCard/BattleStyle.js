import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import LineChart from '../Charts/LineChart';

const BattleStyle = (props) => {
  const stats = props.tankStatsCard || props.accountStats?.data;
  const lastSnapshot = stats.snapshots.at(-1);
  const { dataForTables } = props.filteredStats;

  const fragsRate = (lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2);
  const fragsRateFiltered = dataForTables?.battles ? (dataForTables.frags / dataForTables.battles).toFixed(2) : '-';

  const spottedRate = (lastSnapshot.regular.spotted / lastSnapshot.regular.battles).toFixed(2);
  const spottedRateFiltered = dataForTables?.battles ? (dataForTables.spotted / dataForTables.battles).toFixed(2) : '-';

  const survRate = (lastSnapshot.regular.survivedBattles / lastSnapshot.regular.battles).toFixed(2);
  const survRateFiltered = dataForTables?.battles ? (dataForTables.survivedBattles / dataForTables.battles).toFixed(2) : '-';

  const calcBattlesForMaster = (badge) => (lastSnapshot.regular.battles / lastSnapshot.mastery[badge]).toFixed(0);

  return (
    <Card className="mb-3">
      <CardHeader className="bg-metal">
        <h2>Battles Style</h2>
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
            <td><strong>Frags Rate</strong></td>
            <td><strong className="increase-font-size">{fragsRate}</strong></td>
            <td>{fragsRateFiltered}</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Spotted Rate</strong></td>
            <td><strong className="increase-font-size">{spottedRate}</strong></td>
            <td>{spottedRateFiltered}</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Survival Rate</strong></td>
            <td><strong className="increase-font-size">{survRate}</strong></td>
            <td>{survRateFiltered}</td>
            <td>5</td>
          </tr>
          </tbody>
        </Table>
      </CardBody>

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
              <OverlayTrigger overlay={<Tips>Average value for the whole server</Tips>}>
                <span>Server</span>
              </OverlayTrigger>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><strong>Battles Per Master</strong></td>
            <td><strong className="increase-font-size">{calcBattlesForMaster('markOfMastery')}</strong></td>
            <td>1</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master I</strong></td>
            <td><strong className="increase-font-size">{calcBattlesForMaster('markOfMasteryI')}</strong></td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master II</strong></td>
            <td><strong className="increase-font-size">{calcBattlesForMaster('markOfMasteryII')}</strong></td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master III</strong></td>
            <td><strong className="increase-font-size">{calcBattlesForMaster('markOfMasteryIII')}</strong></td>
            <td>2</td>
          </tr>
          </tbody>
        </Table>
      </CardBody>

      <CardBody>

      </CardBody>

      <CardBody>
        <LineChart
          labels={Object.keys(props.filteredStats.dataForCharts).map((key) => key)}
          datasets={[
            {
              label: 'Survival Rate',
              data: Object.values(props.filteredStats.dataForCharts).map((stats) => ((stats.survivedBattles / stats.battles) * 100).toFixed(2)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]}
        />
      </CardBody>
    </Card>
  );
}

export default BattleStyle
