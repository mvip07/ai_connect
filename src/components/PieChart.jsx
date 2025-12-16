import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentPieChart = ({ totals }) => {
    const data = {
        labels: ['DM Count', 'Comment Count'],
        datasets: [
            {
                data: totals,
                backgroundColor: [
                    '#0A85ff',
                    '#0ab5ff',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.raw}`,
                },
            },
        },
        cutout: '70%',
    };

    return <Pie data={data} options={options} />;
};

export default SentimentPieChart;
