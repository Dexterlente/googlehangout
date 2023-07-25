import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import Registration from "./routes/register.js";
import Logout from "./routes/logout.js";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from 'http';
import createSocketServer from './socketServer.js';

dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const port = process.env.PORT || 4000;
//mongo local db
const mongoURI = process.env.MONGOURI

// Middleware
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/", authRoutes);
app.use("/", Registration);
app.use("/", Logout);


// Create the Socket.IO server
const io = createSocketServer(server,  {
  cors: {
    origin: "http://localhost:5173",
  },
});

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // connect app
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongo();
