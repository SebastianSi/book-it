'use strict';

import smsService from "../services/smsService";

const SmsController = {};

SmsController.postMessage = app => {
    app.post('/api/v2/send_sms', async (req, res) => {
        console.log("req body: ", req.body);
        let { smsBody, phoneNumber } = req.body;
        let smsSent = await smsService.sendMessage(smsBody, phoneNumber);
        return res.status(201).send({
            success: 'true',
            message: 'message sent successfully',
            smsSent
        });
    });
};

module.exports = SmsController;