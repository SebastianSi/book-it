import mongoose from 'mongoose';
import Trainer from './trainer';

const DATABASE_URL = 'mongodb://127.0.0.1:27017/node-express-mongodb-server' ;
const connectDb = () => {
    console.log('CONNECTING TO DB...');
    return mongoose.connect(DATABASE_URL, {useNewUrlParser: true});
};

const closeDbConnection = () => {
    console.log('DISCONNECTING FROM DB...');
    return mongoose.disconnect();
};

const models = { Trainer };
export { connectDb, closeDbConnection };
export default models;