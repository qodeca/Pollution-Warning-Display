const http = require('http');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

// DO NOT CHANGE
const DATABASE_URL = config.DATABASE_URL;
const APP_HOSTNAME = config.APP_HOSTNAME;
const APP_PORT = config.APP_PORT;
const API_KEY = config.API_KEY;
const API_BASE_URL = config.API_BASE_URL;
const API_LANG = config.API_LANG;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    io.emit('msg', 'connected');
});

// FETCH DATA FROM AN OUTSIDE API
server.listen(APP_PORT, APP_HOSTNAME, () => {
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

        //INSERT DATA INTO DATABASE
        MongoClient.connect(DATABASE_URL, (err, db) => {
            if (err) throw err;
            let dbo = db.db('pollution-warning-display-data');
            dbo.collection('airlyData').insertOne(data, err => {
                if (err) throw err;
                db.close();
            });
        });
    });
});
