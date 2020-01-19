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
trainerSchema.statics.findAll = async function () {
    let trainers = await this.find();
    return trainers;
};
const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;

/*
    {
      "id": "fdnq34873etb-032i4c",
      "full_name": "Gica Popescu",
      "email": "gica.popescu855@gmail.com",
      "phone_number": "+40741234567",
      "birth_date": "11/15/1985",
      "available_in": ["Cluj-Napoca"],
      "services_offered": ["personal_training", "nutrition_coaching"],
      "description": "Salut, sunt Gica si ofer servicii de personal training si asistenta nutritie in Cluj-Napoca",
      "photo": "someString"
    },
 */