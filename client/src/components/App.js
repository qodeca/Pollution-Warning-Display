import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import Loading from './Loading';
import PollutionWarningDisplay from './pollution-warning-display/PollutionWarningDisplay';
import Advertisement from './advertisement/Advertisement';
import history from '../history';
import axios from 'axios';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { pollutionData } from '../actions';

class App extends Component {
    fetchData() {
        setTimeout(() => {
            axios.get('http://localhost:3001/api')
                .then(response => {
                    this.props.pollutionData(response.data.data[0]);
                })
                .catch(err => {
                    console.log(err)
                })
        }, 2000);
    }

    componentDidMount() {
        let io = socketIO('http://127.0.0.1:3002');

        io.on('msg', data => {
            if(data === 'newData')
                this.fetchData()
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
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { pollutionData })(App);
