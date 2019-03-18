import React, { Component } from 'react';
import temperature from '../../assets/temperature.png';

export default class TemperatureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentTemperature !== this.props.currentTemperature) {
            this.setState({
                animate: 'hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: ''
                });
            },1000);
        }
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ temperature } className="img-fluid" alt="temperature" />
                <h4 className={ `animate ${ this.state.animate }` }>{ this.props.currentTemperature }°C</h4>
            </div>
        );
    }
};
