import React, { Component } from 'react';
import axios from 'axios';
import socketIO from 'socket.io-client';

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

const roundTo = require('round-to');

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pollutionDesc: '',
            pollutionAdvice: '',
            pollutionValue: null,
            pressure: null,
            humidity: null,
            temperature: null
        }
    }

    fetchData() {
        setTimeout(() => {
            axios.get('http://localhost:3001/api')
                .then(response => {
                    this.setState({
                        pollutionDesc: response.data.data[0].indexes[0].description,
                        pollutionAdvice: response.data.data[0].indexes[0].advice,
                        pollutionLevel: response.data.data[0].indexes[0].level,
                        pollutionValue: roundTo(parseFloat(response.data.data[0].indexes[0].value), 0),
                        pressure: roundTo(parseFloat(response.data.data[0].values[3].value), 0),
                        humidity: roundTo(parseFloat(response.data.data[0].values[4].value), 0),
                        temperature: roundTo(parseFloat(response.data.data[0].values[5].value), 0)
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }, 2000);
    }

    componentDidMount() {
        let io = socketIO('http://127.0.0.1:3002');

        io.on('msg', data => {
            if(data === 'newData')
                this.fetchData();
        });

        io.on('connect_error', () => {
            setTimeout(() => {
                io.connect();
            }, 10000);
        });
    }

    render() {
        return (
            <div id="App">
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
