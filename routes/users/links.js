import express from 'express';
import { getLinks } from '../../controllers/users/linksController.js';

const links = express.Router();

links.get('/', getLinks);

export default links;
