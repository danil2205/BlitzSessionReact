import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ labels, datasets }) => {
  return (
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
          labels,
          datasets,
        }}
      />
    </div>
  );
};

export default LineChart
