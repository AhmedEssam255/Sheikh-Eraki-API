import express from 'express';
import { getBooks } from '../../controllers/users/booksController.js';

const books = express.Router();

books.get( '/', getBooks );

export default books;