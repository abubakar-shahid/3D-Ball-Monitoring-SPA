import express from 'express';
import { createUser, getUser, saveState, getState } from './controller.js';

const router = express.Router();

router.route("/createUser").put(createUser);
router.route("/getUser").get(getUser);
router.route("/saveState").put(saveState);
router.route("/getState").get(getState);

export default router;
