import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const BattleStyle = (props) => {
  const lastSnapshot = props.tankStats.data.snapshots.at(-1);
  const dataForTables = props.filteredStats.dataForTables;
  const isDataEmpty = Object.keys(dataForTables).length > 0;

  const fragsRate = (lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2);
  const fragsRateFiltered = isDataEmpty ? (props.filteredStats.dataForTables.frags / props.filteredStats.dataForTables.battles).toFixed(2) : '-';

  const spottedRate = (lastSnapshot.regular.spotted / lastSnapshot.regular.battles).toFixed(2);
  const spottedRateFiltered = isDataEmpty ? (props.filteredStats.dataForTables.spotted / props.filteredStats.dataForTables.battles).toFixed(2) : '-';

  const survRate = (lastSnapshot.regular.survivedBattles / lastSnapshot.regular.battles).toFixed(2);
  const survRateFiltered = isDataEmpty ? (props.filteredStats.dataForTables.survivedBattles / props.filteredStats.dataForTables.battles).toFixed(2) : '-';

  const battlesForMaster = (lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMastery).toFixed(0);
  const battlesForMasterI = (lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMasteryI).toFixed(0);
  const battlesForMasterII = (lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMasteryII).toFixed(0);
  const battlesForMasterIII = (lastSnapshot.regular.battles / lastSnapshot.mastery.markOfMasteryIII).toFixed(0);

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
            <td><strong className="increase-font-size">{battlesForMaster}</strong></td>
            <td>{fragsRateFiltered}</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master I</strong></td>
            <td><strong className="increase-font-size">{battlesForMasterI}</strong></td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master II</strong></td>
            <td><strong className="increase-font-size">{battlesForMasterII}</strong></td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Battles Per Master III</strong></td>
            <td><strong className="increase-font-size">{battlesForMasterIII}</strong></td>
            <td>2</td>
          </tr>
          </tbody>
        </Table>
      </CardBody>

      <CardBody>
        <div className="chart-container">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              maintainAspectRatio: false,
              scales: {
                xAxis: {
                  ticks: {
                    maxTicksLimit: 10,
                    autoSkip: true,
                  },
                },
              },
            }}
            data={{
              labels: Object.keys(props.filteredStats.dataForCharts).map((key) => key),
              datasets: [
                {
                  label: 'Frags Rate',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => (stats.frags / stats.battles).toFixed(2)),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Spotted Rate',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => (stats.spotted / stats.battles).toFixed(2)),
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
          />
        </div>
      </CardBody>

      <CardBody>
        <div className="chart-container">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              maintainAspectRatio: false,
              scales: {
                xAxis: {
                  ticks: {
                    maxTicksLimit: 10,
                    autoSkip: true,
                  },
                },
              },
            }}
            data={{
              labels: Object.keys(props.filteredStats.dataForCharts).map((key) => key),
              datasets: [
                {
                  label: 'Survival Rate',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => ((stats.survivedBattles / stats.battles) * 100).toFixed(2)),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default BattleStyle
