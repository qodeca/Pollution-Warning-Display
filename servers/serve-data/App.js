const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const config = require('./config');

const CLIENT_URL = config.CLIENT_URL;
const DATABASE_URL = config.DATABASE_URL;
const APP_PORT = config.APP_PORT;

app.get('/api', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    MongoClient.connect(DATABASE_URL, (err, db) => {
        if (err) throw err;
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('airlyData').find({}).sort({'_id':-1}).limit(1).toArray((err, result) => {
            if (err) throw err;
            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

app.listen(APP_PORT);
