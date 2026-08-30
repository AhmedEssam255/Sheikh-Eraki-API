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

app.use(express.json());
app.use(cors());

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

fetch('https://example.com')
  .then(() => console.log('✅ Outbound HTTPS works'))
  .catch((err) => console.error('❌ Outbound HTTPS failed:', err.message));

await connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error', err.message));
await connectCache()
  .then(() => console.log('Redis Connected'))
  .catch((err) => console.log('Redis Connection Error', err.message));
