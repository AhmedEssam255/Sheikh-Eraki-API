import express from 'express';
import { postMessage, patchMessage, deleteMessage } from '../../controllers/admin/messagesController.js';

const messages = express.Router();

messages.post( '/', postMessage );
messages.patch( '/', patchMessage );
messages.delete( '/', deleteMessage );

export default messages;
