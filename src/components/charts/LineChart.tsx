import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


interface IProps {
    mainLabel: string;
    labels: string[];
    dataItems: number[];
}

const LineChart = (props: IProps) => {
    ChartJS.register(CategoryScale,LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
    
    const { mainLabel, labels, dataItems } = props; 

    const options: ChartOptions<"line"> = {
        responsive: true,
        scales: {
            x: {
                display: true,
                min: 0
            }
        }
    };

    const data: ChartData<"line"> = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels,
        datasets: [
            {
                fill: true,
                label: mainLabel,
                data: dataItems,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Line data={data} options={options} />
    )
}

export default LineChart;