import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();
// login route
router.post("/login", login);

// router.get("/logout", logout);

export default router;