import React, { Component } from 'react';
import { connect } from 'react-redux';

import pressure from '../../assets/pressure.png';

const roundTo = require('round-to');

class PressureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            value: roundTo(parseFloat(this.props.data.values[3].value), 0)
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                value: roundTo(parseFloat(nextProps.data.values[3].value), 0)
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
        if(roundTo(parseFloat(nextProps.data.values[3].value), 0) !== this.state.value) {
            this.setState({
                animate: 'hide'
            });

            this.setTimer();
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ pressure } className="img-fluid" alt="pressure" />
                <h4 className={ `animate ${ this.state.animate }` }>
                    { this.state.value }hPa
                </h4>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PressureDisplay);
