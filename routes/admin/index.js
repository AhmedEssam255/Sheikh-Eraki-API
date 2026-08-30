import express from 'express';
import books from './books.js';
import links from './links.js';
import messages from './messages.js';
import loginRoute from './login.js';
import logoutRoute from './logout.js';
import session from 'express-session';
import markets from './markets.js';
import adminAuth from '../../middleware/adminAuth.js';
import { RedisStore } from 'connect-redis';
import { redisClient } from '../../lib/connectCache.js';
import isLoggedInRouter from './isLoggedIn.js';

const admin = express.Router();

const redisStore = new RedisStore({
  client: redisClient,
});

admin.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
      httpOnly: true,
      secure: process.env.IS_PRODUCTION === 'true',
      sameSite: process.env.IS_PRODUCTION === 'true' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    },
  }),
);

admin.use('/login', loginRoute);
admin.use('/logout', logoutRoute);

admin.use(adminAuth);

admin.use('/isLoggedIn', isLoggedInRouter);

admin.use('/api/books', books);
admin.use('/api/links', links);
admin.use('/api/messages', messages);
admin.use('/api/markets', markets);

export default admin;
