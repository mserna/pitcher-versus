import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = (props) => {

  const data = {
    datasets: [
      {
        label: "League avg",
        data: [
          props.league_data
        ],
        backgroundColor: '#fffff',
      },
      {
        label: props.label,
        data: [
          props.player_data
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Y text'
          }
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'X text'
          }
        }
      ]
    },
  };

  return(
  <>
    <div className='header'>
      <h1 className='title'>{props.title}</h1>
      <div className='links'>
      </div>
    </div>
    <Scatter data={data} options={options} />
  </>
  );
};

export default ScatterChart;