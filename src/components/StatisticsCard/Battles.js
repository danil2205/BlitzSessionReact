import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Battles = (props) => {


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
            <td><strong className="increase-font-size">1337</strong></td>
            <td>228</td>
            <td>123</td>
          </tr>
          <tr>
            <td><strong>Regular Battles</strong></td>
            <td><strong className="increase-font-size">14.1</strong></td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><strong>Start Date</strong></td>
            <td><strong className="increase-font-size">3</strong></td>
            <td>4</td>
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
              labels: ['02.05.2023', '03.05.2023', '04.05.2023', '05.05.2023', '06.05.2023'],
              datasets: [
                {
                  label: 'Battles Count',
                  data: [11, 4, 22, 15, 2],
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
