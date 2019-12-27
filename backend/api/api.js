import db from "../models/db";

const setAppRoutes = function(app) {

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
}

export default setAppRoutes;