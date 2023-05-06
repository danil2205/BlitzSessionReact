import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Damage = (props) => {


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
            <td><strong className="increase-font-size">1337</strong></td>
            <td>228</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Avg. damage</strong></td>
            <td><strong className="increase-font-size">14.1</strong></td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Avg. damage received</strong></td>
            <td><strong className="increase-font-size">3</strong></td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td><strong>Tank HP</strong></td>
            <td><strong className="increase-font-size">666</strong></td>
            <td>-</td>
            <td>-</td>
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
              labels: ['22.05.2022', '28.09.2022', '14.11.2022', '01.02.2023', '06.05.2023'],
              datasets: [
                {
                  label: 'Damage ratio',
                  data: [2.1, 1.45, 1.7, 1.1, 0.5],
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
            labels: ['22.05.2022', '28.09.2022', '14.11.2022', '01.02.2023', '06.05.2023'],
            datasets: [
              {
                label: 'Average damage',
                data: [3140, 2690, 3565, 1945, 3220],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Average received damage',
                data: [1360, 1500, 1470, 1240, 1337],
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
