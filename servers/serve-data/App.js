const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const config = require('./config');
const log = require('./logErrors');

app.get('/api/airly-data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if (error) {
            log.saveError(12, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('airlyData').find().sort({timestamp:-1}).limit(1).toArray((error, result) => {
            if (error) {
                log.saveError(20, error);
                throw error;
            }

            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

app.get('/api/advertisements', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if (error) {
            log.saveError(38, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements').find().sort({timestamp:-1}).toArray((error, result) => {
            if (error) {
                log.saveError(46, error);
                throw error;
            }

            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

process.on('unhandledRejection', reason => log.saveError(34, reason));
process.on('uncaughtException', reason => log.saveError(35, reason));

app.listen(config.APP_PORT);
