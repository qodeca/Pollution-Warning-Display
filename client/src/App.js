import React, { Component } from 'react';
import axios from 'axios';
import socketIO from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pollution: {},
            pressure: {},
            humidity: {},
            temperature: {}
        }
    }

    fetchData() {
        axios.get('http://localhost:3001/api', { timeout: 30000 })
            .then(response => {
                this.setState({
                    pollution: response.data.data[0].indexes[0],
                    pressure: response.data.data[0].values[3],
                    humidity: response.data.data[0].values[4],
                    temperature: response.data.data[0].values[5]
                })
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        let io = socketIO('http://127.0.0.1:3002');

        this.fetchData();

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
                DESC: { this.state.pollution.description }
                <br />
                ADVICE: { this.state.pollution.advice }
                <br />
                COLOR: { this.state.pollution.color }
                <br />
                PRESS: { this.state.pressure.value }
                <br />
                HUM: { this.state.humidity.value }
                <br />
                TEMP: { this.state.temperature.value }
            </div>
        );
    }
}

export default App;
