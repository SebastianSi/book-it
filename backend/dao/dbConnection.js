import mongoose from 'mongoose';

const DATABASE_URL = 'mongodb://127.0.0.1:27017/node-express-mongodb-server' ;
const connectDb = () => {
    console.log('CONNECTING TO DB...');
    return mongoose.connect(DATABASE_URL, {useNewUrlParser: true});
};

const closeDbConnection = () => {
    console.log('DISCONNECTING FROM DB...');
    return mongoose.disconnect();
};

export { connectDb, closeDbConnection };