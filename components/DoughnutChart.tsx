'use client'

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const data = {
    labels: [
      'Fidelity Bank',
      'Opay',
      'Cenoa'
    ],
    datasets: [{
      label: 'banks',
      data: [1500, 10000, 20000],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
  return (
      <div className='flex flex-col items-center gap-2 text-3xl'>
      <Doughnut
        data={data}
        options={{
          cutout: '60%',
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
      </div>
  );
}

export default DoughnutChart;
