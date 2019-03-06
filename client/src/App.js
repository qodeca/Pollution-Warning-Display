import React, { Component } from 'react';
import socketIO from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pollution: {},
            pressure: {},
            humidity: {},
            temperature: {}
        };
    }

    fetchData() {
        fetch('http://localhost:3001/api', { method: 'GET'})
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({
                pollution: json.data[0].indexes[0],
                pressure: json.data[0].values[3],
                humidity: json.data[0].values[4],
                temperature: json.data[0].values[5]
            })
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        let io = socketIO('http://127.0.0.1:3001');

        // CHECK IF APP IS CONNECTED
        io.on('msg', data => {
            if(data === 'connected') {
                // FETCH DATA FROM AN INNER API
                this.fetchData();
            }
        });

        // IF APP LOSES CONNECTION
        io.on('connect_error', function() {
            console.clear();
            console.log('xd');
            // TRY TO RECONNECT
            setTimeout(() => {io.connect()}, 10000);
        });
    }

    render() {
        return (
            <div id="App">
                { this.state.pollution.description }
                <br />
                { this.state.pollution.advice }
                <br />
                { this.state.pollution.level }
                <br />
                { this.state.pollution.color }
                <br />
                { this.state.pressure.value }
                <br />
                { this.state.humidity.value }
                <br />
                { this.state.temperature.value }
            </div>
        );
    }
}

export default App;
