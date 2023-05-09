import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const BattleStyle = (props) => {
  const lastSnapshot = props.tankStats.data.snapshots.at(-1);
  const fragsRate = (lastSnapshot.regular.frags / lastSnapshot.regular.battles).toFixed(2);
  const spottedRate = (lastSnapshot.regular.spotted / lastSnapshot.regular.battles).toFixed(2);
  const survRate = (lastSnapshot.regular.survivedBattles / lastSnapshot.regular.battles).toFixed(2);

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
            <td>228</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Spotted Rate</strong></td>
            <td><strong className="increase-font-size">{spottedRate}</strong></td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Survival Rate</strong></td>
            <td><strong className="increase-font-size">{survRate}</strong></td>
            <td>4</td>
            <td>5</td>
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
              labels: props.tankStats.data.snapshots.map((snapshot) => new Date(snapshot.lastBattleTime*1000).toLocaleDateString()),
              datasets: [
                {
                  label: 'Frags Rate',
                  data: props.tankStats.data.snapshots.map((snapshot) => (snapshot.regular.frags / snapshot.regular.battles).toFixed(2)),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Spotted Rate',
                  data: props.tankStats.data.snapshots.map((snapshot) => (snapshot.regular.spotted / snapshot.regular.battles).toFixed(2)),
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
              labels: props.tankStats.data.snapshots.map((snapshot) => new Date(snapshot.lastBattleTime*1000).toLocaleDateString()),
              datasets: [
                {
                  label: 'Survival Rate',
                  data: props.tankStats.data.snapshots.map((snapshot) => ((snapshot.regular.survivedBattles / snapshot.regular.battles) * 100).toFixed(2)),
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
