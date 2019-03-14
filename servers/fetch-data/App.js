const http = require('http');
const fetch = require('node-fetch');
const express = require('express');
const socketIO = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const config = require('./config');
const log = require('./logErrors');

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', () => io.emit('msg', 'newData'));

function fetchData() {
    fetch(`${config.API_BASE_URL}measurements/installation?installationId=${config.API_TRANSMITTER_ID}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Accept-Language": config.API_LANG,
            "apikey": config.API_KEY
        }
    })
        .then(response => response.json())
        .then(json => {
            MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (err, db) => {
                if (err) {
                    log.saveError(27, err);
                    throw err;
                }

                let dbo = db.db('pollution-warning-display-data');

                let data = Object.assign(json.current, { timestamp: Date.now() });

                dbo.collection('airlyData').insertOne(data, err => {
                    if (err) {
                        log.saveError(37, err);
                        throw err;
                    }

                    db.close();
                })
            });
        })
        .then(io.emit('msg', 'newData'));

    setTimeout(fetchData, config.FETCH_INTERVAL);
}

process.on('unhandledRejection', reason => log.saveError(53, reason));
process.on('uncaughtException', reason => log.saveError(54, reason));

io.listen(config.APP_PORT);
server.listen(config.APP_PORT, config.APP_HOSTNAME, fetchData());
