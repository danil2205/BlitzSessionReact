import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Legend, Tooltip, BarElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ labels, datasets }) => {
  return (
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
          labels,
          datasets,
        }}
      />
    </div>
  );
};

export default BarChart;
