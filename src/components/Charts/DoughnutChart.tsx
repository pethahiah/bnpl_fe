"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IDoughnutChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }
}
const DoughnutChart = ({ labels, datasets }: IDoughnutChart) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        ...datasets,
        borderRadius: 30,
        spacing: 5,
        radius: 110,
        cutout:"70%",
      }
    ],
  };

  const total = datasets.data.reduce((i, acc) => (acc + i), 0)
  return (
    <div className="flex relative justify-center items-center w-full h-full">
      <Doughnut options={options} data={data} className='!h-fit max-h-[300px] !w-full ' />
      <div className="absolute p-3 aspect-square bg-white rounded-full shadow-md text-center flex justify-center items-center flex-col gap-2">
        <p className='text-[11px]'>Total Transactions</p>
        <h3 className='text-[18px] font-[500]'>{total}</h3>
      </div>
    </div>

  )
}

export default DoughnutChart