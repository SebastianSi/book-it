import express from 'express';
import bodyParser from 'body-parser';
import setAppRoutes from './api/api';
import models, { connectDb, closeDbConnection } from './models';

// Set up the express app
const app = express();
const PORT = 5000;
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.context = {models};
    next();
});

setAppRoutes(app);

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`)
// });

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.Trainer.deleteMany({}),
        ]);
        initMockDataInDb().then( function getTrainers() {
            console.log('Added mock trainers in db;')
        })
    }
    app.listen(PORT, () =>
        console.log(`Example app listening on port ${PORT}!`),
    );
});

// setTimeout(() => closeDbConnection(), 15000);

const initMockDataInDb = async () => {
    const trainer1 = new models.Trainer({
        id: 'rwieruch843fubcniw38n',
        email: 'trainer1@testdb.com',
        full_name: 'Mock Trainer 1',
        phone_number: '+40123456789',
        birth_date: '20/07/1991',
        description: 'Mock description 1'
    });
    const trainer2 = new models.Trainer({
        id: 'ewauiefwuairuch3farwe',
        email: 'trainer2@testdb.com',
        full_name: 'Mock Trainer 2',
        phone_number: '+40987654321',
        birth_date: '12/05/1987',
        description: 'Mock description 2'
    });
    const trainer3 = new models.Trainer({
        id: 'xmn3u7248bfanrwa8933fdg',
        email: 'trainer3@testdb.com',
        full_name: 'Mock Trainer 3',
        phone_number: '+40555666777',
        birth_date: '04/09/1990',
        description: 'Mock description 3'
    });


    await trainer1.save();
    await trainer2.save();
    await trainer3.save();
};



