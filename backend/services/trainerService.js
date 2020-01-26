'use strict';

import models from '../models';
const cryptoRandomString = require('crypto-random-string');

const TrainerService = {};

TrainerService.findTrainers = async () => {
    try {
        console.log('finding all trainers in DB...');
        return await models.Trainer.find();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

TrainerService.findTrainerById = async id => {
    try {
        console.log(`finding trainer in DB with id ${id} ...`);
        return await models.Trainer.findOne({id});
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

TrainerService.addTrainer = async trainerData => {
    try {
        console.log('persisting trainer in DB...');
        const trainerToPersist= new models.Trainer({
            id: cryptoRandomString(25),
            email: trainerData.email,
            full_name: trainerData.name,
            phone_number: trainerData.phone,
            birth_date: trainerData.date_of_birth,
            description: trainerData.description,
            photo: trainerData.photo,
            sex: trainerData.sex,
            services_offered: trainerData.services_offered,
            available_in: trainerData.available_in
        });

        return await trainerToPersist.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


module.exports = TrainerService;
