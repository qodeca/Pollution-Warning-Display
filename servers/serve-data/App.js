const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const fs = require('fs');
const config = require('./config');

app.get('/api', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    MongoClient.connect(config.DATABASE_URL, { useNewUrlParser: true }, (error, db) => {
        if (error) {
            fs.appendFile('/logs', `error: ${error} - ${Date.now()}`, (err) => {
                if(err)
                    return console.log(err);
            });
            throw error;
        }
        let dbo = db.db('pollution-warning-display-data');

        dbo.collection('airlyData').find({}).sort({'_id':-1}).limit(1).toArray((error, result) => {
            if (error) {
                fs.appendFile('./logs', `error: ${error} - ${Date.now()}\r\n`, (err) => {
                    if(err)
                        return console.log(err);
                });
                throw error;
            }

            fs.appendFile('./logs', `Data succesfully served to client - ${Date.now()}\r\n`, (error) => {
                if(error)
                    return console.log(error);
            });

            return res.status(200).send({
                success: 'true',
                data: result
            });
        });
    });
});

process.on('unhandledRejection', (reason) => {
    fs.appendFile('./logs', `unhandledRejection: ${reason} - ${Date.now()}\r\n`, (err) => {
        if(err)
            return console.log(err);
    });
});

process.on('uncaughtException', (reason) => {
    fs.appendFile('./logs', `uncaughtException: ${reason} - ${Date.now()}\r\n`, (err) => {
        if(err)
            return console.log(err);
    });
});

app.listen(config.APP_PORT);
