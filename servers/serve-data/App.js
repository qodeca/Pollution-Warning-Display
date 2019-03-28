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
            log.saveError(13, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('airlyData').find().sort({timestamp:-1}).limit(1).toArray((error, result) => {
            if (error) {
                log.saveError(21, error);
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
            log.saveError(40, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements').find().toArray((error, result) => {
            if (error) {
                log.saveError(48, error);
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
            log.saveError(66, error);
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
            log.saveError(84, error);
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

// SET SCREENS DURATION
app.route('/submit/set-ad-duration/:infoDuration/:adDuration').post((req, res) => {
    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if(error) {
            log.saveError(102, error);
            throw error;
        }
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('screensDuration', (err, obj) => {
            obj.insertOne({ adDuration: req.params.infoDuration, infoDuration: req.params.adDuration });
            res.redirect('http://localhost:3000/dashboard');
            return res.status(200).send({
                success: true
            })
        });
    });
});

// SERVE ALL DURATIONS
app.get('/api/durations', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if (error) {
            log.saveError(126, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('screensDuration').find().toArray((error, result) => {
            if (error) {
                log.saveError(134, error);
                throw error;
            }

            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

app.get('/api/single-ad/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    let o_id = req.params.id;

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if (error) {
            log.saveError(126, error);
            throw error;
        }

        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements').find({ _id: new mongodb.ObjectID(o_id) }).toArray((error, result) => {
            if (error) {
                log.saveError(1, 162);
                throw error;
            }

            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

// EDIT CHOSEN AD
app.route('/submit/edit-ad/:id/:title/:desc').post((req, res) => {
    let o_id = req.params.id;
    let o_title = req.params.title;
    let o_desc = req.params.desc;

    mongodb.MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if(error) {
            log.saveError(182, error);
            throw error;
        }
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('advertisements').update(
            {_id: new mongodb.ObjectID(o_id) },
            { title : o_title, desc: o_desc },
            function(err, result) {
                console.log(result);
            });
        });
        res.redirect('http://localhost:3000/dashboard');
        return res.status(200).send({
            success: true
        });
});

process.on('unhandledRejection', reason => log.saveError(34, reason));
process.on('uncaughtException', reason => log.saveError(35, reason));

app.listen(config.APP_PORT);
