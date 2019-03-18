import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Logo } from './Logo';
import { ClockComponent } from './ClockComponent';
import DateComponent from './DateComponent';
import TemperatureDisplay from './TemperatureDisplay';
import HumidityDisplay from './HumidityDisplay';
import PressureDisplay from './PressureDisplay';
import FaceImage from './FaceImage';
import Advice from './Advice';
import Description from './Description';
import { Footer } from './Footer';
import { pollutionData } from '../../actions';

const roundTo = require('round-to');

class PollutionWarningDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: '',
            pollutionDesc: this.props.data.indexes[0].description,
            pollutionAdvice: this.props.data.indexes[0].advice,
            pollutionLevel: this.props.data.indexes[0].level,
            pollutionValue: roundTo(parseFloat(this.props.data.indexes[0].value), 0),
            pressure: roundTo(parseFloat(this.props.data.values[3].value), 0),
            humidity: roundTo(parseFloat(this.props.data.values[4].value), 0),
            temperature: roundTo(parseFloat(this.props.data.values[5].value), 0)
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            this.setState({
                visibility: 'show'
            })
        }, 500);

        setTimeout(() =>{
            this.setState({
                visibility: ''
            })
        }, 59500);

        setTimeout(() => {
            this.props.history.push('/advertisement')
        }, 60000);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.setState({
                pollutionDesc: nextProps.data.indexes[0].description,
                pollutionAdvice: nextProps.data.indexes[0].advice,
                pollutionLevel: nextProps.data.indexes[0].level,
                pollutionValue: roundTo(parseFloat(nextProps.data.indexes[0].value), 0),
                pressure: roundTo(parseFloat(nextProps.data.values[3].value), 0),
                humidity: roundTo(parseFloat(nextProps.data.values[4].value), 0),
                temperature: roundTo(parseFloat(nextProps.data.values[5].value), 0)
            });
        }
    }

    render() {
        return (
            <div className={ `pollution-warning-display ${ this.state.visibility }` }>
                <div className="container text-center">
                    <Logo />

                    <FaceImage pollutionValue={ this.state.pollutionValue } pollutionLevel={ this.state.pollutionLevel } />

                    <Description desc={ this.state.pollutionDesc } />
                    <Advice advice={ this.state.pollutionAdvice } />

                    <ClockComponent />
                    <DateComponent />

                    <div className="row">
                        <div className="col-4">
                            <TemperatureDisplay currentTemperature={ this.state.temperature } />
                        </div>
                        <div className="col-4">
                            <HumidityDisplay currentHumidity={ this.state.humidity } />
                        </div>
                        <div className="col-4">
                            <PressureDisplay currentPressure={ this.state.pressure } />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { pollutionData })(PollutionWarningDisplay);
