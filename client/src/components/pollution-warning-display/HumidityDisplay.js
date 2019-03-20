import React, { Component } from 'react';
import { connect } from 'react-redux';

import humidity from '../../assets/humidity.png';
import { mapStateToProps } from '../../functions';

const roundTo = require('round-to');

class HumidityDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            value: roundTo(parseFloat(this.props.data.values[4].value), 0)
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                value: roundTo(parseFloat(nextProps.data.values[4].value), 0)
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
        if(roundTo(parseFloat(nextProps.data.values[4].value), 0) !== this.state.value) {
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
                <img src={ humidity } className="img-fluid" alt="humidity" />
                <h4 className={ `animate ${ this.state.animate }` }>
                    { this.state.value }%
                </h4>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HumidityDisplay);
