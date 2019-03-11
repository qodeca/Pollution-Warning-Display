import React from 'react';
import temperature from '../assets/temperature.png';

const TemperatureDisplay = (props) => {
    return(
        <div className="weather-values">
            <img src={ temperature } className="img-fluid" alt="temperature" />
            <h4>{ props.currentTemperature }°C</h4>
        </div>
    );
};

export default TemperatureDisplay;
