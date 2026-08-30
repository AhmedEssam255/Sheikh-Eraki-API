import express from 'express';
import { getMarkets } from '../../controllers/users/marketsController.js';

const markets = express.Router();

markets.get('/', getMarkets);

export default markets;
