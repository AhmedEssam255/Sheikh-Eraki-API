import express from 'express';
import books from './books.js';
import links from './links.js';
import messages from './messages.js';
import videos from './videos.js';
import markets from './markets.js';

const users = express.Router();

users.use('/api/books', books);
users.use('/api/links', links);
users.use('/api/messages', messages);
users.use( '/api/videos', videos );
users.use( '/api/markets', markets );

export default users;