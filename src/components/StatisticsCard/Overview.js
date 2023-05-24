import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Card, CardHeader, CardBody, CardImg } from 'reactstrap';
import { useParams } from 'react-router-dom';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend, Tooltip);

const OverviewCard = (props) => {
  const { wotId } = useParams();
  const isTankStatsCard = Boolean(props.tankStatsCard);
  const stats = props.tankStatsCard || props.accountStats.data;
  const serverStats = isTankStatsCard ?
    props.serverStats.serverStats.tanks.find((tankStats) => tankStats.wotId === Number(wotId)).regular :
    props.serverStats.serverStats.account.regular;

  const lastSnapshot = stats.snapshots.at(-1);

  const winRate = lastSnapshot.regular.wins / (lastSnapshot.regular.battles || 1);
  const winRateServer = serverStats.wins / (serverStats.battles || 1);

  const damageRate = lastSnapshot.regular.damageDealt / (lastSnapshot.regular.damageReceived || 1);
  const damageRateServer = serverStats.damage_dealt / (serverStats.damage_received || 1);

  const fragsRate = lastSnapshot.regular.frags / (lastSnapshot.regular.battles || 1);
  const fragsRateServer = serverStats.frags / (serverStats.battles || 1);

  const spotsRate = lastSnapshot.regular.spotted / (lastSnapshot.regular.battles || 1);
  const spotsRateServer = serverStats.spotted / (serverStats.battles || 1);

  const survivalRate = lastSnapshot.regular.survivedBattles / (lastSnapshot.regular.battles || 1);
  const survivalRateServer = serverStats.survived_battles / (serverStats.battles || 1);


  return (
    <Card className='mb-3'>
      <CardHeader className='bg-metal'>
        <h2>Overview</h2>
      </CardHeader>

      {props.tankStatsCard && props.tankStatsCard.image && <CardImg className='tankStatsImg' variant='top' src={props.tankStatsCard.image} />  }

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
              ],
              datasets: [
                {
                  label: 'Your Statistics',
                  data: [
                    winRate / winRateServer,
                    damageRate / damageRateServer,
                    fragsRate / fragsRateServer,
                    spotsRate / spotsRateServer,
                    survivalRate / survivalRateServer,
                  ],
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  borderWidth: 1,
                },
                {
                  label: 'Statistics of the server',
                  data: [1, 1, 1, 1, 1],
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

