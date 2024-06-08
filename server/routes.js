import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from './controller.js';

const router = express.Router();

router.route("/getNotes").get(getNotes);
// router.route("/signUp").post(controller.signUp);
// router.route("/login").post(controller.login);
// router.route("/saveState").post(controller.forgotCredentials);

export default router;
