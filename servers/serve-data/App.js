const express = require('express');
const app = express();
import * as mongodb from 'mongodb';

const config = require('./config');
const log = require('./logErrors');

// SERVE AIRLY DATA
app.get('/api/airly-data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
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

// SERVE ALL ADS
app.get('/api/advertisements', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
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


// DELETE CHOSEN AD
app.route('/submit/delete/:id').post((req, res) => {
    let o_id = req.params.id;

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if(error) {
            log.saveError(63, error);
            throw error;
        }
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements', (err, obj) => {
            obj.deleteOne({ _id: new mongodb.ObjectID(o_id) });
            res.redirect('http://localhost:3000/dashboard');
            return res.status(200).send({
                success: true
            })
        });
    });
});

// ADD NEW AD
app.route('/submit/add/:title/:desc').post((req, res) => {
    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if(error) {
            log.saveError(63, error);
            throw error;
        }
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements', (err, obj) => {
            obj.insertOne({ title: req.params.title, description: req.params.desc });
            res.redirect('http://localhost:3000/dashboard');
            return res.status(200).send({
                success: true
            })
        });
    });
});

process.on('unhandledRejection', reason => log.saveError(34, reason));
process.on('uncaughtException', reason => log.saveError(35, reason));

app.listen(config.APP_PORT);
