import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';

import Loading                                                           from './Loading';
import PollutionWarningDisplay                                           from './pollution-warning-display/PollutionWarningDisplay';
import Advertisement                                                     from './advertisement/Advertisement';
import history                                                           from '../history';
import {pollutionData, advertisementsData, timeToSkipAd, timeToSkipInfo} from '../actions';
import { mapStateToProps }                                               from '../functions';
import Login                                                             from './login/Login';
import Dashboard                                                         from './dashboard/Dashboard';

class App extends Component {
    async fetchData() {
        try {
            const response = await axios.get('http://localhost:3001/api/airly-data');
            this.props.pollutionData(response.data.data[0]);
        } catch(err) {
            console.log(err);
        }
    }

    async fetchAdvertisement() {
        try {
            const response = await axios.get('http://localhost:3001/api/advertisements');
            this.props.advertisementsData(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    async fetchSettings () {
        try {
            const response = await axios.get('http://localhost:3001/api/durations');
            let len = response.data.data.length;
            let last = response.data.data[len-1];
            this.props.timeToSkipAd(last.infoDuration);
            this.props.timeToSkipInfo(last.adDuration);
        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount() {
        let io = socketIO('http://127.0.0.1:3002');

        this.fetchSettings();

        this.fetchAdvertisement();

        io.on('msg', data => {
            if(data === 'newData') {
                this.fetchData();
            }
        });

        io.on('connect_error', () => {
            setTimeout(() => {
                io.connect()
            }, 10000)
        });
    }

    render() {
        return (
            <div id="App">
                <Router history={ history }>
                    <Route exact path="/" component={ Loading } />
                    <Route exact path="/pollution-warning-display" component={ PollutionWarningDisplay } />
                    <Route exact path="/advertisement" component={ Advertisement } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/dashboard" component={ Dashboard } />
                </Router>
            </div>
        );
    }
}

export default connect(mapStateToProps, { pollutionData, advertisementsData, timeToSkipAd, timeToSkipInfo })(App);
