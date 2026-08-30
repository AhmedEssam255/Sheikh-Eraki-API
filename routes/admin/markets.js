import express from 'express';
import { postMarket, patchMarket, deleteMarket } from '../../controllers/admin/marketsController.js';

const markets = express.Router();

markets.post( '/', postMarket );
markets.patch( '/', patchMarket );
markets.delete( '/', deleteMarket );

export default markets;
