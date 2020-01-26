import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: false,
        sparse: true
    },
    full_name: {
        type: String,
        unique: false,
    },
    phone_number: {
        type: String,
        unique: false,
        sparse: true
    },
    birth_date: {
        type: String,
        unique: false,
    },
    sex: {
        type: String,
        unique: false,
    },
    description: {
        type: String,
        unique: false,
    },
    services_offered: {
        type: [String],
    },
    available_in: {
        type: [String],
    },
    photo: {
        type: String,
        unique: false,
    }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

//in case of unique indexes in mongo:
// Trainer.collection.dropIndexes(function(err, results) {
//     console.log('err:', err);
//     console.log('results: ', results);
// });


export default Trainer;
