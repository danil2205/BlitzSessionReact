import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { OverlayTrigger, Tooltip as Tips } from 'react-bootstrap';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';

const Wins = (props) => {
  const lastSnapshot = props.tankStats.data.snapshots.at(-1);
  const { dataForTables, dataForCharts } = props.filteredStats;

  const winRate = `${((lastSnapshot.regular.wins / lastSnapshot.regular.battles) * 100).toFixed(2)}%`;
  const winRateFiltered = dataForTables?.battles ? `${((dataForTables.wins / dataForTables.battles) * 100).toFixed(2)}%` : '-';

  const labelsForCharts = Object.keys(dataForCharts).map((key) => key);

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
              <td>{dataForTables.wins}</td>
              <td>2</td>
            </tr>
            <tr>
              <td><strong>Loses</strong></td>
              <td><strong className="increase-font-size">{lastSnapshot.regular.losses}</strong></td>
              <td>{dataForTables.losses}</td>
              <td>5</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>

      <CardBody>
          <LineChart
            labels={labelsForCharts}
            datasets={[
              {
                label: 'WinRate',
                data: Object.values(dataForCharts).map((stats) => ((stats.wins / stats.battles) * 100).toFixed(2)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ]}
          />
      </CardBody>

      <CardBody>
        <BarChart
          labels={labelsForCharts}
          datasets={[
            {
              label: 'Wins',
              data: Object.values(dataForCharts).map((stats) => stats.wins),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Loses',
              data: Object.values(dataForCharts).map((stats) => stats.losses),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export default Wins;
