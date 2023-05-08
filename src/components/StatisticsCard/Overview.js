import { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Card, CardHeader, CardBody, CardImg } from 'reactstrap';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend, Tooltip);

const OverviewCard = (props) => {

  return (
    <Card className='mb-3'>
      <CardHeader className='bg-metal'>
        <h2>Overview</h2>
      </CardHeader>

      {props.tankStats && props.tankStats.image && <CardImg className='tankStatsImg' variant='top' src={props.tankStats.image} />  }

      <CardBody>

        <div className='chart-container'>
          <Radar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              maintainAspectRatio: false,
              scales: {
                r: {
                  beginAtZero: true,
                },
              },
            }}
            data={{
              labels: [
                'Win rate',
                'Damage rate',
                'Frags rate',
                'Spots rate',
                'Survival rate',
                'Remaining HP rate',
              ],
              datasets: [
                {
                  label: 'Your Statistics',
                  data: [
                    1.5, 2.2, 3.3, 4.4, 3.2, 1.2,
                  ],
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  borderWidth: 1,
                },
                {
                  label: 'Statistics of the server',
                  data: [1, 1, 1, 1, 1, 1],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default OverviewCard;

