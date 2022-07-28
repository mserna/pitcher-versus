import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = (props) => {

    const data = {
        labels: [props.axis_label],
        datasets: [
            {
                label: 'league avg',
                data: [props.league_data],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'player',
                data: [props.player_data],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
      
    const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
        bar: {
            borderWidth: 2,
        },
        },
        responsive: true,
        plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: props.title,
        },
        },
    };

    return(
        <>
            <div className='header'>
            <h1 className='title'>{props.title}</h1>
            </div>
            <Bar data={data} options={options} />
        </>
    );
};

export default HorizontalBarChart;