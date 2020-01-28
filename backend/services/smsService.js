'use strict';

const SmsService = {};

SmsService.sendMessage = async (smsBody, phoneNumber) => {
    const accountSid = 'ACe16f4709cd4b8f5107ae46419b55083e';
    const authToken = '';
    const twilioNumberSender = '+17146761104';
    const client = require('twilio')(accountSid, authToken);

    try {
        console.log(`sending message to ${phoneNumber} ...`);
        return await client.messages
            .create({
                body: smsBody,
                from: twilioNumberSender,
                to: phoneNumber
            })
            .then(message => message)
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports = SmsService;