import React from 'react';
import pressure from '../assets/pressure.png';

export const PressureDisplay = props => {
    return(
        <div className="weather-values">
            <img src={ pressure } className="img-fluid" alt="pressure" />
            <h4>{ props.currentPressure }hPa</h4>
        </div>
    );
};
