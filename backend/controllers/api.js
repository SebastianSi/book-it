import trainerController from './trainerController';
import smsController from './smsController';

const setAppRoutes = function(app) {

    //Note: this simply sets the routes for the trainerController
    //and smsController, does not actually execute their functions;
    //They act as listeners and will execute when their respective endpoints are called
    trainerController.addTrainer(app);
    trainerController.getTrainers(app);
    trainerController.getTrainerById(app);
    smsController.postMessage(app);

};

export default setAppRoutes;

