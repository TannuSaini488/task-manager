import express from 'express';
import statsController from "../controllers/statsController.js";
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/overview", protect, statsController.getOverview);

export default router;
