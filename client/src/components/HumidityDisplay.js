import React from 'react';
import humidity from '../assets/humidity.png';

export const HumidityDisplay = props => {
    return(
        <div className="weather-values">
            <img src={ humidity } className="img-fluid" alt="humidity" />
            <h4>{ props.currentHumidity }%</h4>
        </div>
    );
};
