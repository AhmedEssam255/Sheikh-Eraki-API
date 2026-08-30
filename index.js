import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './lib/connectDB.js';
import { connectCache } from './lib/connectCache.js';

import users from './routes/users/index.js';
import admin from './routes/admin/index.js';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();

app.use(morgan('dev'));

app.set('trust proxy', 1);
app.use(
  cors({
    origin:
      process.env.IS_PRODUCTION === 'true'
        ? 'https://sheikh-eraki.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

app.use('/users', users);
app.use('/admin', admin);

app.get('/', (req, res) => {
  res.send('Sheikh Eraki API');
});

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 2010;
app.listen(port, '0.0.0.0', () =>
  console.log('Server is running on port ' + port),
);

await connectDB();
await connectCache();
