import express from 'express';
import { login } from '../../controllers/admin/adminLogin.js';

const loginRoute = express.Router();

loginRoute.post( '/', login );

export default loginRoute;