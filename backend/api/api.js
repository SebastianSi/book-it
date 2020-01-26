import models from '../models';
const cryptoRandomString = require('crypto-random-string');

const setAppRoutes = function(app) {

    app.get('/api/v2/trainers', async (req, res) => {

        let {name, sex, city} = req.query;
        let trainers = await models.Trainer.find();
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

    app.get('/api/v2/trainers/:id', async (req, res) => {
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

};

export default setAppRoutes;

