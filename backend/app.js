import express from 'express';
import db from './dummyDB/db';
import bodyParser from 'body-parser';

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
    next();
});
// get all todos
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
app.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
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

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);
    console.log('ho!');
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedTodo,
    });
});

app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Todo deleted successfuly',
            });
        }
    });


    return res.status(404).send({
        success: 'false',
        message: 'todo not found',
    });


});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}