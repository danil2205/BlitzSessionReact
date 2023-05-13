import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Wins = (props) => {
  const lastSnapshot = props.tankStats.data.snapshots.at(-1);
  const dataForTables = props.filteredStats.dataForTables;
  const isDataEmpty = Object.keys(dataForTables).length > 0;

  const winRate = `${((lastSnapshot.regular.wins / lastSnapshot.regular.battles) * 100).toFixed(2)}%`
  const winRateFiltered = isDataEmpty ? `${((props.filteredStats.dataForTables.wins / props.filteredStats.dataForTables.battles) * 100).toFixed(2)}%` : '-'

  return (
    <Card className="mb-3">
      <CardHeader className="bg-metal">
        <h2>Wins</h2>
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
              <td><strong>WinRate</strong></td>
              <td><strong className="increase-font-size">{winRate}</strong></td>
              <td>{winRateFiltered}</td>
              <td>123</td>
            </tr>
            <tr>
              <td><strong>Wins</strong></td>
              <td><strong className="increase-font-size">{lastSnapshot.regular.wins}</strong></td>
              <td>{props.filteredStats.dataForTables.wins}</td>
              <td>2</td>
            </tr>
            <tr>
              <td><strong>Loses</strong></td>
              <td><strong className="increase-font-size">{lastSnapshot.regular.losses}</strong></td>
              <td>{props.filteredStats.dataForTables.losses}</td>
              <td>5</td>
            </tr>
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
              labels: Object.keys(props.filteredStats.dataForCharts).map((key) => key),
              datasets: [
                {
                  label: 'WinRate',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => ((stats.wins / stats.battles) * 100).toFixed(2)),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </div>
      </CardBody>

      <CardBody>
        <div className="chart-container">
          <Bar
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
                  label: 'Wins',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => stats.wins),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Loses',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => stats.losses),
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

export default Wins;
