'use strict';

import trainerService from "../services/trainerService";

const TrainerController = {};

TrainerController.addTrainer = app => {
    app.post('/api/v2/trainers', async (req, res) => {
        console.log("req body: ", req.body);
        let trainerAddedInDb = await trainerService.addTrainer(req.body);

        return res.status(201).send({
            success: 'true',
            message: 'trainer added successfully',
            trainer: trainerAddedInDb
        });
    });
};

TrainerController.getTrainers = app => {
    app.get('/api/v2/trainers', async (req, res) => {
        let {name, sex, city} = req.query;
        let trainers = await trainerService.findTrainers();

        if (name) {
            trainers = trainers.filter(trainer=>
                trainer.full_name.toUpperCase().includes(name.toUpperCase())
            )
        }
        if (sex) {
            trainers = trainers.filter(trainer=> trainer.sex === sex)
        }
        if (city) {
            trainers = trainers.filter(trainer=> {
                let cities = trainer.available_in.map(city=>city.toUpperCase());
                return cities.includes(city.toUpperCase())
            })
        }
        return res.send(trainers);
    });
};

TrainerController.getTrainerById = app => {
    app.get('/api/v2/trainers/:id', async (req, res) => {
        let trainerFromDb = await trainerService.findTrainerById(req.params.id);

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
};

module.exports = TrainerController;