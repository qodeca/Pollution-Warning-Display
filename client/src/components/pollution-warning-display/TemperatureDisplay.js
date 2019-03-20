import React, { Component } from 'react';
import { connect } from 'react-redux';

import temperature from '../../assets/temperature.png';
import { mapStateToProps } from '../../functions';

const roundTo = require('round-to');

class TemperatureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            value: roundTo(parseFloat(this.props.data.values[5].value), 0)
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                value: roundTo(parseFloat(nextProps.data.values[5].value), 0)
            });
            this.timerHandle = 0;
        }, 1000);
    };

    clearTimer = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
            this.setState({
                animate: ''
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        if(roundTo(parseFloat(nextProps.data.values[5].value), 0) !== this.state.value) {
            this.setState({
                animate: 'hide'
            });

           this.setTimer(nextProps);
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ temperature } className="img-fluid" alt="temperature" />
                <h4 className={ `animate ${ this.state.animate }` }>
                    { this.state.value }°C
                </h4>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TemperatureDisplay);
