import express from 'express';
import { postBook, patchBook, deleteBook } from '../../controllers/admin/booksController.js';

const books = express.Router();

books.post( '/', postBook );
books.patch( '/', patchBook );
books.delete( '/', deleteBook );

export default books;
