import express, { Router } from 'express'; // Import the Router class directly
import twilio from 'twilio'; // Import the entire twilio module
import dotenv from 'dotenv';
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

router.post('/incoming', (req, res) => {
    const from = req.body.From;
    const body = req.body.Body;
        // Log the incoming message details
    console.log(`Received message from: ${from}`);
    console.log(`Message content: ${body}`);
    
    
    res.sendStatus(200); // Send a successful response to Twilio
  });



export default router; 