import express from 'express';
import { postLink, patchLink, deleteLink } from '../../controllers/admin/linksController.js';

const links = express.Router();

links.post( '/', postLink );
links.patch( '/', patchLink );
links.delete( '/', deleteLink );

export default links;
