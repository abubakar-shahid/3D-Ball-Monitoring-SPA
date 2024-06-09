import express from 'express';
import { createUser, getUserInfo, saveState } from './controller.js';

const router = express.Router();

router.route("/createUser").post(createUser);
router.route("/getUserInfo").post(getUserInfo);
router.route("/saveState").put(saveState);

export default router;
