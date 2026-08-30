import express from 'express';
import { getMessages } from '../../controllers/users/messagesController.js';

const messages = express.Router();

messages.get( '/', getMessages );

export default messages;