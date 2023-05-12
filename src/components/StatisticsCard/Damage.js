import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Damage = (props) => {
  return;
  const lastSnapshot = props.accountStats.data.snapshots.at(-1);

  const damageRatio = (lastSnapshot.regular.damageDealt / lastSnapshot.regular.damageReceived).toFixed(3);
  const damageRatioFiltered = props.filteredStats ? (props.filteredStats.regular.damageDealt / props.filteredStats.regular.damageReceived).toFixed(3) : '-';

  const avgDamage = (lastSnapshot.regular.damageDealt / lastSnapshot.regular.battles).toFixed(0);
  const avgDamageFiltered = props.filteredStats ? (props.filteredStats.regular.damageDealt / props.filteredStats.regular.battles).toFixed(0) : '-';

  const avgDamageReceived = (lastSnapshot.regular.damageReceived / lastSnapshot.regular.battles).toFixed(0);
  const avgDamageReceivedFiltered = props.filteredStats ? (props.filteredStats.regular.damageReceived / props.filteredStats.regular.battles).toFixed(0) : '-';

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
            <td><strong className="increase-font-size">666</strong></td>
            <td>-</td>
            <td>-</td>
          </tr>}
          </tbody>
        </Table>
      </CardBody>

      <CardBody>
        <div className='chart-container'>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              maintainAspectRatio: false,
              spanGaps: true,
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
              labels: props.accountStats.data.snapshots.map((snapshot) => new Date(snapshot.lastBattleTime*1000).toLocaleDateString()),
              datasets: [
                {
                  label: 'Damage ratio',
                  data: props.accountStats.data.snapshots.map((snapshot) => (snapshot.regular.damageDealt / snapshot.regular.damageReceived).toFixed(3)),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </div>
      </CardBody>

      <CardBody>
        <div className='chart-container'>
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            maintainAspectRatio: false,
            spanGaps: true,
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
            labels: props.accountStats.data.snapshots.map((snapshot) => new Date(snapshot.lastBattleTime*1000).toLocaleDateString()),
            datasets: [
              {
                label: 'Average damage',
                data: props.accountStats.data.snapshots.map((snapshot) => (snapshot.regular.damageDealt / snapshot.regular.battles).toFixed(0)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Average received damage',
                data: props.accountStats.data.snapshots.map((snapshot) => (snapshot.regular.damageReceived / snapshot.regular.battles).toFixed(0)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
        />
      </div>
      </CardBody>
    </Card>
  );
};

export default Damage;
