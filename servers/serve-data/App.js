const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

const DATABASE_URL = config.DATABASE_URL;
const APP_PORT = config.APP_PORT;

const app = express();

// START LISTENING
app.listen(APP_PORT);

// SERVE DATA
app.get('/api', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // START DATABASE CONNECTION
    MongoClient.connect(DATABASE_URL, (err, db) => {
        if (err) throw err;
        let dbo = db.db("pollution-warning-display-data");

        // DISPLAY DATA
        dbo.collection("airlyData").find({}).sort({'_id':-1}).limit(1).toArray((err, result) => {
            if (err) throw err;
            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});
