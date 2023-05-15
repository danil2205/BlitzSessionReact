import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Battles = (props) => {
  const lastSnapshot = props.tankStats.data.snapshots.at(-1);
  const dataForTables = props.filteredStats.dataForTables;
  const isDataEmpty = Object.keys(dataForTables).length > 0;

  const months = new Date().getMonth() - new Date(props.tankStats.data.createdAt * 1000).getMonth() +
    12 * (new Date().getFullYear() - new Date(props.tankStats.data.createdAt * 1000).getFullYear());

  const battlesPerYear = Math.round(((lastSnapshot.regular.battles + (lastSnapshot.rating?.battles ?? 0)) / months) * 12);
  const battlesPerYearFiltered = isDataEmpty ? Math.round(((props.filteredStats.dataForTables.battles) / months) * 12) : '-'; // temporary without rating

  return (
    <Card className="mb-3">
      <CardHeader className="bg-metal">
        <h2>Battles</h2>
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
            <td><strong>Battles Per Year</strong></td>
            <td><strong className="increase-font-size">{battlesPerYear}</strong></td>
            <td>{battlesPerYearFiltered}</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Regular Battles</strong></td>
            <td><strong className="increase-font-size">{lastSnapshot.regular.battles}</strong></td>
            <td>{props.filteredStats.dataForTables.battles}</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Rating Battles</strong></td>
            <td><strong className="increase-font-size">{lastSnapshot.rating?.battles || 0}</strong></td>
            <td>-</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Start Date</strong></td>
            <td><strong className="increase-font-size">{new Date(props.tankStats.data.createdAt * 1000).toLocaleDateString()}</strong></td>
            <td>{props.filteredStats.filteredDate}</td>
            <td>5</td>
          </tr>
          </tbody>
        </Table>
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
                  label: 'Battles Count',
                  data: Object.values(props.filteredStats.dataForCharts).map((stats) => stats.battles),
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
};

export default Battles;
