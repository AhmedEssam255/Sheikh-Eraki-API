import express from 'express';
import { logout } from '../../controllers/admin/adminLogout.js';

const logoutRoute = express.Router();

logoutRoute.get( '/', logout );

export default logoutRoute;