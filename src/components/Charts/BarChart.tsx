"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IBarChart {
  height?: number | string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    hoverBackgroundColor?: string;
    barThickness?: number;
  }[];
}

function BarChart({ labels, datasets, height }: IBarChart) {
  const options = {
    responsive: true,
    scales: {
      x: {
          offset: true,
          fill: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: "end" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const barData = {
    labels,
    datasets: datasets.map(set => {
      return {
        ...set,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
        minBarLength: 2,
      }
    })
  };
  return (
    <div>
      <Bar options={options} data={barData} height={height} />
    </div>
  )
}

export default BarChart