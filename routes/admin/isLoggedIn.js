import express from 'express';
import { isLoggedIn } from '../../controllers/admin/isLoggedInController.js';

const isLoggedInRouter = express.Router();

isLoggedInRouter.get('/', isLoggedIn);

export default isLoggedInRouter;
