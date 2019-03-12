import React from 'react';
import temperature from '../assets/temperature.png';

export const TemperatureDisplay = props => {
    return(
        <div className="weather-values">
            <img src={ temperature } className="img-fluid" alt="temperature" />
            <h4>{ props.currentTemperature }°C</h4>
        </div>
    );
};
