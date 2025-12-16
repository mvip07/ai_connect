import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ chartData }) => {
    const shiftCountsToUTC5 = (data) => {
        const shifted = new Array(24).fill(0);

        data.forEach((item, index) => {
            const newIndex = (index + 5) % 24; // UTC +5
            shifted[newIndex] = item.count;
        });

        return shifted;
    };

    const labels = chartData?.map(item => item.time);
    // const values = chartData && chartData?.map(item => item.count); //  === 0 ? Math.floor(Math.random() * 100) : item.count
    const values = chartData ? shiftCountsToUTC5(chartData) : [];

    const data = {
        labels,
        datasets: [
            {
                data: values,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
            x: {
                grid: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
