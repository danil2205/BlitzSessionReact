import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import LineChart from '../Charts/LineChart';

const BattleStyle = (props) => {
  const stats = props.tankStatsCard || props.accountStats.data;
  const lastSnapshot = stats.snapshots.at(-1);
  const serverStats = props.serverStats.serverStats.account;
  const dataForTables = props.filteredStats.dataForTables;

  const fragsRate = (lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2);
  const fragsRateFiltered = dataForTables?.battles ? (dataForTables.frags / dataForTables.battles).toFixed(2) : '-';
  const fragsRateServer = (serverStats.regular.frags / serverStats.regular.battles).toFixed(2);

  const spottedRate = (lastSnapshot.regular.spotted / lastSnapshot.regular.battles).toFixed(2);
  const spottedRateFiltered = dataForTables?.battles ? (dataForTables.spotted / dataForTables.battles).toFixed(2) : '-';
  const spottedRateServer = (serverStats.regular.spotted / serverStats.regular.battles).toFixed(2);

  const survRate = (lastSnapshot.regular.survivedBattles / lastSnapshot.regular.battles).toFixed(2);
  const survRateFiltered = dataForTables?.battles ? (dataForTables.survivedBattles / dataForTables.battles).toFixed(2) : '-';
  const survRateServer = (serverStats.regular.survived_battles / serverStats.regular.battles).toFixed(2);

  const calcBattlesForMaster = (stats, badge) => (stats.regular.battles / stats.mastery[badge]).toFixed(0);
  const badges = ['markOfMastery', 'markOfMasteryI', 'markOfMasteryII', 'markOfMasteryIII'];

  const calculateBattlesForMasters = (stats) => {
    const battles = {};
    badges.forEach((badge) => {
      battles[badge] = +calcBattlesForMaster(stats, badge);
    });
    return battles;
  };

  const lastSnapshotBattles = calculateBattlesForMasters(lastSnapshot);
  const serverStatsBattles = calculateBattlesForMasters(serverStats);

  console.log(lastSnapshotBattles)
  console.log(serverStatsBattles)
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
            <td className={fragsRateServer < fragsRate ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{fragsRate}</strong>
            </td>
            <td className={fragsRateServer < fragsRateFiltered ? 'success-background': 'warning-background'}>
              {fragsRateFiltered}
            </td>
            <td>{fragsRateServer}</td>
          </tr>
          <tr>
            <td><strong>Spotted Rate</strong></td>
            <td className={spottedRateServer < spottedRate ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{spottedRate}</strong>
            </td>
            <td className={spottedRateServer < spottedRateFiltered ? 'success-background': 'warning-background'}>
              {spottedRateFiltered}
            </td>
            <td>{spottedRateServer}</td>
          </tr>
          <tr>
            <td><strong>Survival Rate</strong></td>
            <td className={survRateServer < survRate ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{survRate}</strong>
            </td>
            <td className={survRateServer < survRateFiltered ? 'success-background': 'warning-background'}>
              {survRateFiltered}
            </td>
            <td>{survRateServer}</td>
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
            <td className={lastSnapshotBattles.markOfMastery < serverStatsBattles.markOfMastery ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{lastSnapshotBattles.markOfMastery}</strong>
            </td>
            <td>{serverStatsBattles.markOfMastery}</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master I</strong></td>
            <td className={lastSnapshotBattles.markOfMasteryI < serverStatsBattles.markOfMasteryI ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{lastSnapshotBattles.markOfMasteryI}</strong>
            </td>
            <td>{serverStatsBattles.markOfMasteryI}</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master II</strong></td>
            <td className={lastSnapshotBattles.markOfMasteryII < serverStatsBattles.markOfMasteryII ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{lastSnapshotBattles.markOfMasteryII}</strong>
            </td>
            <td>{serverStatsBattles.markOfMasteryII}</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master III</strong></td>
            <td className={lastSnapshotBattles.markOfMasteryIII < serverStatsBattles.markOfMasteryIII ? 'success-background': 'warning-background'}>
              <strong className="increase-font-size">{lastSnapshotBattles.markOfMasteryIII}</strong>
            </td>
            <td>{serverStatsBattles.markOfMasteryIII}</td>
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
