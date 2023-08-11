import express, { Router } from 'express'; // Import the Router class directly
import twilio from 'twilio'; // Import the entire twilio module
import dotenv from 'dotenv';
import socketIOClient from 'socket.io-client';
import createSocketServer  from '../socketServer.js'


dotenv.config();
const io = createSocketServer();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const router = Router();

router.post('/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

const incomingMessages = []

router.post('/incoming', (req, res) => {
    const from = req.body.From;
    const body = req.body.Body;
    const timestamp = new Date().toLocaleString();
        // Log the incoming message details
    console.log(`Received message from: ${from}`);
    console.log(`Message content: ${body}`);
    console.log(`Timestamp: ${timestamp}`);
    
      // Add the message to the array
  incomingMessages.push({ from, body, timestamp });

    res.sendStatus(200); // Send a successful response to Twilio
  });

// Route to get incoming messages with timestamps
router.get('/incoming', (req, res) => {
  res.json({ messages: incomingMessages });
});

router.post('/make-call', async (req, res) => {
  const { to } = req.body;
  const from = process.env.TWILIO_PHONE_NUMBER;

  try {
    // const socket = socketIOClient('http://localhost:5000');
    const twiml = new twilio.twiml.VoiceResponse();
    const dial = twiml.dial();
    dial.number(to); // Dial the recipient's number

      const call = await client.calls.create({
        to,
        from,
        twiml: twiml.toString(),
      });
      //return to client
      res.json({ success: true, callSid: call.sid });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: error.message });
    }
});


router.post('/inbound', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Thank you for calling!');

    // Retrieve incoming phone number from the request
    const incomingNumber = req.body.From;
    console.log('Incoming number:', incomingNumber);
    console.log('Emitting incoming-call event:', { number: incomingNumber });
    io.emit('incoming-call', { number: incomingNumber });

  res.type('text/xml');
  res.send(twiml.toString());
});

router.get('/generate-token', (req, res) => {
  console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
  console.log('TWILIO_API_KEY:', process.env.TWILIO_API_KEY);
  console.log('TWILIO_API_SECRET:', process.env.TWILIO_API_SECRET);
  console.log('TWIML_APP_SID:', process.env.TWIML_APP_SID);

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const twilioAccountSid  = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey  = process.env.TWILIO_API_KEY;
  const twilioApiSecret  = process.env.TWILIO_API_SECRET;
  const appSid = process.env.TWIML_APP_SID;
  console.log(twilioAccountSid)
  const identity = 'user';

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: appSid,
    incomingAllow: true,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
  );
  console.log(token)
  token.addGrant(voiceGrant);
  console.log(token.toJwt());
  const payloadtoken = token.toJwt();
  res.json({ payloadtoken });

});

router.get('/print-env', (req, res) => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;
  const twimlAppSid = process.env.TWIML_APP_SID;

  const envVariables = {
    TWILIO_ACCOUNT_SID: twilioAccountSid,
    TWILIO_API_KEY: twilioApiKey,
    TWILIO_API_SECRET: twilioApiSecret,
    TWIML_APP_SID: twimlAppSid,
  };

  res.json(envVariables);
});

export default router; 