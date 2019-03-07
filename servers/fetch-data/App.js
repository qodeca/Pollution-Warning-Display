const http = require('http');
const fetch = require('node-fetch');
const express = require('express');
const socketIO = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const config = require('./config');

const DATABASE_URL = config.DATABASE_URL;
const APP_HOSTNAME = config.APP_HOSTNAME;
const APP_PORT = config.APP_PORT;
const API_KEY = config.API_KEY;
const API_BASE_URL = config.API_BASE_URL;
const API_LANG = config.API_LANG;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', () => {
    io.emit('msg', 'newData');
});

function fetchData() {
    fetch(`${API_BASE_URL}measurements/installation?installationId=${config.API_TRANSMITTER_ID}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Accept-Language": API_LANG,
            "apikey": API_KEY
        }
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        let data = json.current;

        MongoClient.connect(DATABASE_URL, (err, db) => {
            if (err) throw err;
            let dbo = db.db('pollution-warning-display-data');
            dbo.collection('airlyData').insertOne(data, err => {
                if (err) throw err;
                db.close();
            });
        });

        io.emit('msg', 'newData');
    })
}

io.listen(APP_PORT);
server.listen(APP_PORT, APP_HOSTNAME, () => {
    setInterval(fetchData, 1800000)
});
