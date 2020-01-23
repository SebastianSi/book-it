import db from "../models/db";
const cryptoRandomString = require('crypto-random-string');
import models, { connectDb, closeDbConnection } from '../models';
import mongoose from "mongoose";

const setAppRoutes = function(app) {

    //data from db
    app.get('/api/v2/trainers', async (req, res) => {
        // console.log('DROPPING DB...');
        // mongoose.connection.dropDatabase();
        console.log('retrieved all trainers');
        const trainers = await models.Trainer.find();
        return res.send(trainers);
    });

    app.get('/api/v2/trainers/:id', async (req, res) => {
        // const id = req.params.id ;

        // var query  = Kitten.where({ color: 'white' });

        let trainerFromDb = await models.Trainer.findOne({ id: req.params.id });

        if (trainerFromDb) {
            console.log('retrieved trainer with id: ', req.params.id);
            return res.status(200).send({
                success: 'true',
                message: 'trainerFromDb retrieved successfully',
                trainerFromDb,
            });
        } else {
            return res.status(404).send({
                success: 'false',
                message: 'trainer does not exist',
            });
        }
    });

    app.post('/api/v2/trainers', async (req, res) => {
        console.log("req body: ", req.body);

        const trainerToPersist= new models.Trainer({
            id: cryptoRandomString(25),
            email: req.body.email,
            full_name: req.body.name,
            phone_number: req.body.phone,
            birth_date: req.body.date_of_birth,
            description: req.body.description,
            photo: req.body.photo,
            sex: req.body.sex,
            services_offered: req.body.services_offered,
            available_in: req.body.available_in,
        });

        await trainerToPersist.save();

        return res.status(201).send({
            success: 'true',
            message: 'trainer added successfully',
            trainer: req.body
        });
    });

    //local jsonfile
    app.get('/api/v1/trainers', (req, res) => {
        res.status(200).send({
            success: 'true',
            message: 'trainers retrieved successfully',
            data: db
        })
    });

    app.get('/api/v1/trainers/:id', (req, res) => {
        const id = req.params.id ;

        let trainerFromDb;

        db.trainers.map((trainer) => {
            if (trainer.id === id) {
                trainerFromDb = trainer;
            }
        });
        if (trainerFromDb) {
            return res.status(200).send({
                success: 'true',
                message: 'trainerFromDb retrieved successfully',
                trainerFromDb,
            });
        } else {
            return res.status(404).send({
                success: 'false',
                message: 'todo does not exist',
            });
        }
    });

    app.post('/api/v1/trainers', (req, res) => {
        if(!req.body.trainer) {
            return res.status(400).send({
                success: 'false',
                message: 'trainer is required'
            });
        }
        const trainer = {
            id: generateUUID(),
            trainer: req.body.trainer
        };
        db.push(trainer);
        return res.status(201).send({
            success: 'true',
            message: 'trainer added successfully',
            trainer
        });
    });

//TODO: PUT seems to fail, need to check why
    app.put('/api/v1/trainers/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        let trainerFound;
        let itemIndex;
        db.map((trainer, index) => {
            if (trainer.id === id) {
                trainerFound = trainer;
                itemIndex = index;
            }
        });

        if (!trainerFound) {
            return res.status(404).send({
                success: 'false',
                message: 'Trainer not found',
            });
        }

        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required',
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required',
            });
        }

        const updatedTrainer = {
            id: trainerFound.id,
            title: req.body.title || trainerFound.title,
            description: req.body.description || trainerFound.description,
        };

        db.splice(itemIndex, 1, updatedTrainer);
        console.log('ho!');
        return res.status(201).send({
            success: 'true',
            message: 'Trainer added successfully',
            updatedTrainer,
        });
    });

    app.delete('/api/v1/trainers/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);

        db.map((trainer, index) => {
            if (trainer.id === id) {
                db.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'Trainer deleted successfuly',
                });
            }
        });


        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });


    });
};
//
// function generateUUID() {
//     var d = new Date().getTime();//Timestamp
//     var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16;//random number between 0 and 16
//         if(d > 0){//Use timestamp until depleted
//             r = (d + r)%16 | 0;
//             d = Math.floor(d/16);
//         } else {//Use microseconds since page-load if supported
//             r = (d2 + r)%16 | 0;
//             d2 = Math.floor(d2/16);
//         }
//         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//     });
// }

export default setAppRoutes;

