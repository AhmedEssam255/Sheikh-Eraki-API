import mongoose from 'mongoose';
import validateUrl from '../lib/validateUrl.js';

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (x) => x.length > 0,
  },
  url: {
    type: String,
    required: true,
    validate: (x) => validateUrl(x),
  },
});

const Books = mongoose.model('Books', booksSchema);
export default Books;
