import express from 'express';
import { createUser, getUserInfo, saveState } from './controller.js';

const router = express.Router();

router.route("/createUser").put(createUser);
router.route("/getUserInfo").get(getUserInfo);
router.route("/saveState").post(saveState);

export default router;
