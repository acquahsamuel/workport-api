const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (options) => {
  try {
    const message = {
      from: `${process.env.FROM_NUMBER}`,
      to: `${process.env.TO_NUMBER}`,
      body: options.message,
    };

    await client.messages.create(message);
    // console.log('Message sent: %s', info.sid);
  } catch (error) {
    // console.log(error);
  }
};

// client.messages
//   .create({
//     body: `Workport OTP : ${code}`,
//     from: 'whatsapp:+14155238886',
//     to: 'whatsapp:+233262195121',
//   })
//   .then((message) => console.log(message.sid))
//   .done();

module.exports = sendSMS;
