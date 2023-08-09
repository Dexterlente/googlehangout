import express, { Router } from 'express'; // Import the Router class directly
import twilio from 'twilio'; // Import the entire twilio module
import dotenv from 'dotenv';
// import { twilioClient } from './twilio-client';
// import { VoiceResponse } from 'twilio/lib/twiml/VoiceResponse';
import socketIOClient from 'socket.io-client';


dotenv.config();

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
  //   const twiml = `
  //   <Response>
  //     <Dial>
  //       <Number>${to}</Number> <!-- Replace with recipient's phone number -->
  //     </Dial>
  //   </Response>
  // `;
  const socket = socketIOClient('http://localhost:5000');
  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial();
  dial.number(to); // Dial the recipient's number

  socket.emit('startAudioStreaming', { to });


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

  res.type('text/xml');
  res.send(twiml.toString());
});


export default router; 