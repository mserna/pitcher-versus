import React from 'react';
import { PolarArea } from 'react-chartjs-2';

const Polar = (props) => {
    
    const data = {
        labels: Object.keys(props.data),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(props.data),
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(63, 237, 47, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
    <>
        <div className='header'>
        <h1 className='title'>{props.title}</h1>
        </div>
        <PolarArea data={data} />
    </>
    );
};

export default Polar;