import React, { Component } from 'react';
import temperature from '../assets/temperature.png';

export default class TemperatureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentTemperature !== this.props.currentTemperature) {
            this.setState({
                animate: 'animate hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: 'animate',
                    text: nextProps.currentTemperature + '°C'
                })
            },1000)
        }
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ temperature } className="img-fluid" alt="temperature" />
                <h4 className={ this.state.animate }>{ this.state.text }</h4>
            </div>
        )
    }
};
